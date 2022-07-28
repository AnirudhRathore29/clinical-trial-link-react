import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import '../../Patient/MyChats/myChats.css';
import db from '../../utils/Firebase';
import moment from 'moment';
import classNames from "classnames";
import { chatDateFormat } from '../../utils/Utils';

const SponsorsMyChats = (props) => {
    const containerRef = useRef(null);
    const currentUserDetail = props.auth.user
    const [chatMessagesList, setChatMessagesList] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [recieverCounter, setRecieveerCounter] = useState(0);
    const [message, setMessage] = useState('');
    const [reciverIdx, setReciverIdx] = useState(props.location.state ? props.location.state.id : "");
    const [reciverName, setReciverName] = useState(props.location.state ? props.location.state.full_name : "");
    const [reciverImage, setReciverImage] = useState(props.location.state ? props.location.state.profile_image : "");
    const [chatWindowDown, setChatWindowDown] = useState(0)

    // console.log("chatMessagesList", chatMessagesList)

    // console.log("reciverIdx", reciverIdx)
    // console.log("reciverName", reciverName)
    // console.log("reciverImage", reciverImage)

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }

    }, [containerRef, chatList, reciverIdx, chatWindowDown])

    useEffect(() => {
        if (reciverIdx && reciverName && currentUserDetail) {
            var msgData = [];
            var usersChatId = combine2UserId(currentUserDetail.id);
            db.collection('Chat')
                .doc(usersChatId.toString())
                .collection('messages')
                .orderBy('date')
                // .orderBy('date', 'desc')
                .limit(50)
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        msgData.push(change.doc.data());
                    });
                    setChatMessagesList(msgData);
                });

            //set current user count 0
            db.collection('List')
                .doc(currentUserDetail.id.toString())
                .collection('userDetails')
                .get()
                .then(documentSnapshot => {
                    documentSnapshot.docs.forEach(change => {
                        if (change.id === reciverIdx.toString()) {
                            db.collection('List')
                                .doc(currentUserDetail.id.toString())
                                .collection('userDetails')
                                .doc(reciverIdx.toString())
                                .update({
                                    count: 0,
                                });
                        }
                    });
                });
        }
    }, [recieverCounter, reciverIdx])


    useEffect(() => {
        // get List data from reciever id
        if ((reciverIdx && reciverName)) {

            db.collection('List')
                .doc(reciverIdx.toString())
                .collection('userDetails')
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.doc.data().reciverId === currentUserDetail.id.toString()) {
                            setRecieveerCounter(change.doc.data().count);
                        }
                    });
                });

            // set current user count 0
            db.collection('List')
                .doc(currentUserDetail.id.toString())
                .collection('userDetails')
                .get()
                .then(documentSnapshot => {
                    documentSnapshot.docs.forEach(change => {
                        if (change.id.toString() === reciverIdx.toString()) {
                            db.collection('List')
                                .doc(currentUserDetail.id.toString())
                                .collection('userDetails')
                                .doc(reciverIdx.toString())
                                .update({
                                    count: 0,
                                });
                        }
                    });
                });
        }
    });

    const combine2UserId = (id) => {
        var currentUser = id;
        var userReciever = reciverIdx;
        var chatIDpre = [];
        chatIDpre.push(currentUser);
        chatIDpre.push(userReciever);
        chatIDpre.sort(function (a, b) {
            return a - b;
        });
        return chatIDpre.join('_');
    }

    const sendChatMessage = async (e) => {
        e.preventDefault()
        if (message.trim()) {
            db.collection('Chat')
                .doc(combine2UserId(currentUserDetail.id).toString())
                .collection('messages')
                .doc(Date.now().toString())
                .set({
                    message: message.trim(),
                    date: Date.now(),
                    senderId: currentUserDetail.id,
                    reciverId: Number(reciverIdx),
                    senderName: currentUserDetail.full_name,
                    recieverName: reciverName,
                });

            // chat list of reciever id
            db.collection('List')
                .doc(reciverIdx.toString())
                .collection('userDetails')
                .doc(currentUserDetail.id.toString())
                .set({
                    reciverId: Number(currentUserDetail.id),
                    recieverName: currentUserDetail.full_name,
                    message: message,
                    date: Date.now(),
                    profileImage: currentUserDetail.profile_image === null ? null : currentUserDetail.profile_image,
                    count: parseInt(recieverCounter) + 1,
                });

            // chat list db for sender id
            db.collection('List')
                .doc(currentUserDetail.id.toString())
                .collection('userDetails')
                .doc(reciverIdx.toString())
                .set({
                    reciverId: reciverIdx.toString(),
                    recieverName: reciverName,
                    message: message,
                    date: Date.now(),
                    profileImage: reciverImage === null ? null : reciverImage,
                    count: 0,
                });
            setRecieveerCounter(recieverCounter + 1);
            setMessage('');
        }
    }

    const setDateValue = (item, index) => {
        var timestemp = new Date(item.date);
        if (index === 0) {
            var preDate = item.date;
            // return (
            //     <div className="date-split if"> {chatDateFormat(item.date)} </div>
            // );
            let currentDate = moment(new Date()).format('DD/MM/YYYY');
            let msgDate = moment(preDate).format('DD/MM/YYYY');
            if (currentDate === msgDate) {
                return (
                    <div className="date-split"> Today </div>
                );
            } else {
                return (
                    <div className="date-split"> {moment(timestemp).format('DD MMM YYYY')} </div>
                );
            }
        } else {
            // if (moment(preDate).format('DD MMM YYYY') !== moment(item.date).format('DD MMM YYYY')) {
            //     return (
            //         <div className="date-split else"> {chatDateFormat(item.date)} </div>
            //     );
            // }
            if (moment(preDate).format('DD MMM YYYY') !== moment(item.date).format('DD MMM YYYY')) {
                preDate = item.date;
                let currentDate = moment(new Date()).format('DD/MM/YYYY');
                let msgDate = moment(preDate).format('DD/MM/YYYY');
                if (currentDate === msgDate) {
                    return (
                        <div className="date-split"> Today </div>
                    );
                } else {
                    return (
                        <div className="date-split"> {moment(new Date(item.date)).format('DD MMM YYYY')} </div>
                    );
                }
            }
        }
    }

    //Get Chat List Data
    useEffect(() => {
        var messageChatData = [];
        db.collection('List')
            .doc(currentUserDetail.id.toString())
            .collection('userDetails')
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().map(change => {
                    if (change.type === 'modified') {
                        const newData = change.doc.data();
                        const newMap = messageChatData.map((data, id) =>
                            data.reciverId == newData.reciverId ? newData : data,
                        );
                        messageChatData = newMap;
                    } else {
                        messageChatData.push(change.doc.data());
                    }
                    var newList = messageChatData.sort((x, y) => {
                        return y.date - x.date;
                    });
                    setChatList(newList);
                });
            });
    }, [])

    //set Chat list time
    const setChatListTime = (item) => {
        var timestemp = new Date(item.date);
        if (moment(timestemp).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY')) {
            return 'Today';
        } else {
            return moment(timestemp).format('DD/MM/YYYY');
        }
    }

    const handleselectChatOpen = (data) => {
        setReciverIdx(data.reciverId);
        setReciverName(data.recieverName);
        setReciverImage(data.profileImage);
        setTimeout(() => {
            setChatWindowDown(chatWindowDown + 1)
        }, 1000);
    };

    console.log("chatWindowDown", chatWindowDown)
    return (
        <div className="clinical-dashboard my-favorites-section">
            <div className="container">
                <div className="heading-bx">
                    <h1>My Chats</h1>
                </div>

                <div className="chat-container">
                    <aside>
                        <div className="conversations">
                            {/* active */}
                            {chatList && chatList.map((item, index) => (
                                <div
                                    className={classNames(
                                        "thread",
                                        { "active": reciverIdx.toString() === item.reciverId.toString() }
                                    )}
                                    key={index}
                                    onClick={() => handleselectChatOpen(item)}
                                >
                                    <div className="details">
                                        <div className="user-head">
                                            <img src={item.profileImage !== null ? item.profileImage : "/images/placeholder-img.jpg"} alt={item.recieverName} />
                                        </div>
                                        <div className="user-name">{item.recieverName}</div>
                                        <div className="last-message">{item.message}</div>
                                    </div>
                                    <div
                                        className={classNames(
                                            "last",
                                            { "new": item.count > 0 }
                                        )}
                                    > {setChatListTime(item)} </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <main>
                        <div className="top-bar">
                            <div className="user-info">
                                <div className="user-head">
                                    <img src={reciverImage ? reciverImage : "/images/placeholder-img.jpg"} alt={reciverName} />
                                </div>
                                <div className="name">{reciverName}</div>
                                {/* <div className="status online" /> */}
                            </div>
                            <div className="chat-header-btn">
                                <div className="call"><i className="fas fa-phone-volume" /></div>
                            </div>
                        </div>
                        <div className="messages" id="messages" ref={containerRef}>
                            {chatMessagesList && chatMessagesList.map((item, index) => (
                                <React.Fragment key={index} >
                                    {setDateValue(item, index)}
                                    <div className={`message ${item.reciverId.toString() !== currentUserDetail.id.toString() ? 'fromme' : ''}`}>
                                        <div className="content">{item.message}</div>
                                        <p className='message-time'>{moment(new Date(item.date)).format('hh:mm a')}</p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <form onSubmit={sendChatMessage} className="bottom-bar">
                            <input value={message} onChange={(e) => setMessage(e.target.value)} className="msg-input" placeholder="New Message" />
                            <div className="chat-user-options">
                                <button type='submit' className="send-btn"><box-icon name='send' color="#ffffff"></box-icon></button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SponsorsMyChats);
