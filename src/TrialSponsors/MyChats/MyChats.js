import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import './myChats.css';
import { db, getTokenFunc } from '../../utils/Firebase';
import { storage } from '../../utils/Firebase';
import moment from 'moment';
import classNames from "classnames";
import { capitalizeFirstLetter, chatDateFormat } from '../../utils/Utils';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from 'crypto-js';


// toast.configure();


const SponsorsMyChats = (props) => {
    const containerRef = useRef(null);
    const attachmentInput = useRef(null);
    const currentUserDetail = props.auth.user
    const [chatMessagesList, setChatMessagesList] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [FCMToken, setFCMToken] = useState();
    const [recieverCounter, setRecieveerCounter] = useState(0);
    const [message, setMessage] = useState('');
    const [reciverIdx, setReciverIdx] = useState(props.location.state ? props.location.state.id : "");
    const [reciverName, setReciverName] = useState(props.location.state ? props.location.state.full_name : "");
    const [reciverImage, setReciverImage] = useState(props.location.state ? props.location.state.profile_image : "");
    const [chatWindowDown, setChatWindowDown] = useState(0)
    const [ChatCount, setChatCount] = useState(0)
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(null);

    console.log("reciverIdx", reciverIdx);
    console.log("FCMToken", FCMToken);
    console.log("ChatCount", ChatCount);
    console.log("chatMessagesList", chatMessagesList);
    console.log("progresspercent", progresspercent);
    console.log("imgUrl", imgUrl);
    console.log("attachmentInput", attachmentInput);
    console.log("chatList", chatList);
    console.log("progresspercent > 0 && progresspercent < 99", progresspercent > 0 && progresspercent < 99);

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

    // useEffect(() => {
    //     setChatCount(ChatCount + 1)
    // }, [ChatCount])

    //Get Chat List Data

    useEffect(() => {
        if(reciverIdx){
            db.collection('List')
            .doc(reciverIdx?.toString())
            .get()
            .then((snapshot) => {
              const token = snapshot.get("fcm_token")
              setFCMToken(token)
            });
        }
    }, [reciverIdx])

    useEffect(() => {
        let messageChatData = [];
        db.collection('List')
            .doc(currentUserDetail.id.toString())
            .collection('userDetails')
            .orderBy("date", "desc")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === 'modified') {
                        const newData = change.doc.data();
                        const newMap = messageChatData.map((data) =>
                            data.reciverId == newData.reciverId ? newData : data,
                        );
                        messageChatData = newMap;
                    } else {
                        messageChatData.push(change.doc.data());
                    }
                    const newList = messageChatData.sort(function (x, y) {
                        return y.date - x.date;
                    });
                    setChatList(newList);
                });
            });

        let msgData = [];
        db.collection('Chat')
            .doc(combine2UserId(currentUserDetail.id).toString())
            .collection('messages')
            .orderBy('date')
            // .orderBy('date', 'desc')
            // .limit(50)
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    msgData.push(change.doc.data());
                });
                setChatMessagesList(msgData);
                // updateFunction(msgData)
            });

        //set current user count 0
        db.collection('List')
            .doc(currentUserDetail.id.toString())
            .collection('userDetails')
            .get()
            .then((documentSnapshot) => {
                documentSnapshot.docs.forEach(function (change) {
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
    }, [reciverIdx, ChatCount])

    useEffect(() => {
        // get List data from reciever id
        if (reciverIdx && reciverName) {
            db.collection('List')
                .doc(reciverIdx.toString())
                .collection('userDetails')
                .onSnapshot(function (snapshot) {
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

    const getUploadedFile = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]

            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log("progressprogress", progress);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        attachmentInput.current.value = ""
                        setImgUrl(downloadURL)
                        setProgresspercent(null)
                        toast.success("File uploaded!", { theme: "colored", autoClose: 5000})
                    });
                }
            );
        }
    }

    const removeFile = () => {
        setImgUrl(null)
    }

    const sendChatMessage = (e) => {
        e.preventDefault()
        setChatCount(ChatCount + 1)
        if (message.trim() || imgUrl) {
            const encryptedMessage = message.trim() && CryptoJS.AES.encrypt(JSON.stringify(message.trim()),process.env.REACT_APP_SECRET_KEY).toString();
            db.collection('Chat')
                .doc(combine2UserId(currentUserDetail.id).toString())
                .collection('messages')
                .doc(Date.now().toString())
                .set({
                    message: encryptedMessage,
                    date: Date.now(),
                    senderId: currentUserDetail.id,
                    reciverId: Number(reciverIdx),
                    senderName: currentUserDetail.full_name,
                    recieverName: reciverName,
                    photoUrl: imgUrl
                });

            // chat list of reciever id
            db.collection('List')
                .doc(reciverIdx.toString())
                .collection('userDetails')
                .doc(currentUserDetail.id.toString())
                .set({
                    reciverId: Number(currentUserDetail.id),
                    recieverName: currentUserDetail.full_name,
                    message: encryptedMessage,
                    date: Date.now(),
                    profileImage: currentUserDetail.profile_image === null ? null : currentUserDetail.profile_image,
                    photoUrl: imgUrl,
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
                    message: encryptedMessage,
                    date: Date.now(),
                    profileImage: reciverImage === null ? null : reciverImage,
                    photoUrl: imgUrl,
                    count: 0,
                });
            sendNotification({message: message ? message : imgUrl?.split('%')?.pop()?.split('?')[0], sender_name: currentUserDetail?.full_name});
            setRecieveerCounter(recieverCounter + 1);
            setMessage('');
            setImgUrl(null)
            setProgresspercent(null)
            attachmentInput.current.value = ""
        }
    }

    let previousDate = '';
    const setDateValue = (item, index) => {
        if (index === 0) {
            previousDate = item.date;
            return (
                <div className="date-split if"> {chatDateFormat(item.date)} </div>
            );
        } else {
            if (moment(previousDate).format('DD MMM YYYY') !== moment(item.date).format('DD MMM YYYY')) {
                previousDate = item.date;
                return (
                    <div className="date-split else"> {chatDateFormat(item.date)} </div>
                );
            }
        }
    }

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

    const decryptMessage = (text) => {
        console.log("originalTextText", text);
        if(text){
            var bytes  = CryptoJS.AES.decrypt(text?.toString(), process.env.REACT_APP_SECRET_KEY);
            var originalText = bytes?.toString(CryptoJS.enc.Utf8);
            console.log("originalText", originalText);
            return originalText.replace(/['"]+/g, '')
        } else {
            return text
        }
    }

    const sendNotification = (data) => {
        const notification = {
          title: `New message from ${data?.sender_name}`,
          body: data?.message,
          icon: '/images/placeholder-img.jpg',
          click_action: 'http://clinicaltriallink.org/',
        };
      
        const payload = {
          notification: notification,
          to: FCMToken,
        };
      
        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            Authorization: `key=${process.env.REACT_APP_SERVER_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            console.log('Notification sent');
          })
          .catch((error) => {
            console.error("Notification sent error", error);
          });
      };      

    return (
        <div className="clinical-dashboard my-favorites-section">
            <div className="container">
                <div className="heading-bx">
                    <h1>My Chats</h1>
                </div>

                <div className="chat-container">
                    <aside>
                        <div className="conversations">
                            {chatList?.length !== 0 && chatList?.map((item, index) => {
                                return (
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
                                            <div className="user-name">{capitalizeFirstLetter(item?.recieverName)}</div>
                                            <div className="last-message">{item?.message ? decryptMessage(item?.message) : item?.photoUrl?.split('%')?.pop()?.split('?')[0]}</div>
                                        </div>
                                        <div
                                            className={classNames(
                                                "last",
                                                { "new": item?.count > 0 }
                                            )}
                                        > <span> {setChatListTime(item)} </span> </div>
                                    </div>
                                )
                            })}
                        </div>
                    </aside>

                    <main>
                        {reciverName &&
                            <div className="top-bar">
                                <div className="user-info">
                                    <div className="user-head">
                                        <img src={reciverImage ? reciverImage : "/images/placeholder-img.jpg"} alt={reciverName} />
                                    </div>
                                    <div className="name">{capitalizeFirstLetter(reciverName)}</div>
                                    {/* <div className="status online" /> */}
                                </div>
                                <div className="chat-header-btn">
                                    <div className="call"><i className="fas fa-phone-volume" /></div>
                                </div>
                            </div>
                        }
                        <div className="messages" id="messages" ref={containerRef}>
                            {chatMessagesList.map((item, index) => (
                                <React.Fragment key={index} >
                                    {setDateValue(item, index)}
                                    <div className={`message ${item.reciverId.toString() !== currentUserDetail.id.toString() ? 'fromme' : ''}`}>
                                        <div className="content">
                                            {typeof item?.photoUrl === "string" && "jpeg, jpg, png".includes(item?.photoUrl?.split('.')?.pop()?.split('?')[0]) ? <img src={item?.photoUrl} alt="Photo" /> :
                                                typeof item?.photoUrl === "string" && !"jpeg, jpg, png".includes(item?.photoUrl?.split('.')?.pop()?.split('?')[0]) &&
                                                <div className='fileInChat'>
                                                    <h2><i>{item?.photoUrl?.split('%')?.pop()?.split('?')[0]}</i></h2>
                                                    <a href={item?.photoUrl} download target="_blank"><box-icon name='download' type='solid' color="#356aa0" size="20px"></box-icon></a>
                                                </div>
                                            }
                                            {decryptMessage(item.message)}
                                            {/* {item.message} */}
                                        </div>
                                        <p className='message-time'>{moment(new Date(item.date)).format('hh:mm a')}</p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        {reciverName &&
                            <form onSubmit={sendChatMessage} className={progresspercent === 0 && progresspercent < 99 ? "bottom-bar disabledBar" : "bottom-bar"}>
                                <input value={message} onChange={(e) => setMessage(e.target.value)} className="msg-input" placeholder="New Message" />
                                <div className='attachmentBx'>
                                    <input type="file" ref={attachmentInput} onChange={getUploadedFile} />
                                    <button type='button'>
                                        {
                                            (progresspercent === 0 && progresspercent < 99) ?
                                                <box-icon name='loader-alt' animation='spin' color="#ffffff" size="25px"></box-icon>
                                                :
                                                <box-icon name='paperclip' color="#ffffff"></box-icon>
                                        }
                                    </button>
                                </div>
                                <div className="chat-user-options">
                                    <button type='submit' className="send-btn"><box-icon name='send' color="#ffffff"></box-icon></button>
                                </div>
                                {imgUrl &&
                                    <div className='fileViewer'>
                                        <h2><span>{imgUrl?.split('%')?.pop()?.split('?')[0]}</span> <button type='button' onClick={removeFile}><box-icon name='x'></box-icon></button></h2>
                                    </div>
                                }
                            </form>
                        }
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
