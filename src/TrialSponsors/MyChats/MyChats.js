import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import '../../Patient/MyChats/myChats.css';
import firebase from 'firebase'
import db from '../../utils/Firebase';
import { chatDateFormat, getTimeFromDate } from '../../utils/Utils';
import moment from 'moment';

const SponsorsMyChats = (props) => {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [formValue, setFormValue] = useState('');

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(25).onSnapshot(snapshot => {
            // console.log("snapshot.docs.map(doc => doc.data()", snapshot.docs.map(doc => doc.data()))
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault()
        const { id, profile_image } = props.auth.user
        db.collection('messages').add({
            text: formValue,
            photoURL: profile_image,
            uid: id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: moment().format("DD/MM/YYYY")
        })
        setFormValue('');
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Chats</h1>
                    </div>

                    <div className="chat-container">
                        <aside>
                            <div className="conversations">
                                {/* active */}
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head">
                                            <img src="/images/user-img-1.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Stephanie Phillips</div>
                                        <div className="last-message">Yeah, the presentation is scheduled for tomorrow, will you be able to make it?</div>
                                    </div>
                                    <div className="last new">12:32</div>
                                </div>
                            </div>
                        </aside>
                        <main>
                            <div className="top-bar">
                                <div className="user-info">
                                    <div className="user-head">
                                        <img src="/images/user-img-1.jpg" alt="user" />
                                    </div>
                                    <div className="name">Joe Faraah</div>
                                    {/* <div className="status online" /> */}
                                </div>
                                <div className="chat-header-btn">
                                    <div className="call"><i className="fas fa-phone-volume" /></div>
                                </div>
                            </div>
                            <div className="messages" id="messages">
                                {messages && messages.map(({ uid, text, createdAt, date }) => (
                                    <React.Fragment key={createdAt} >
                                        {/* <div className="date-split">{chatDateFormat(date)}</div> */}
                                        <div className={`message ${uid === props.auth.user.id ? 'fromme' : ''}`}>
                                            <div className="content">{text}</div>
                                            <p className='message-time'>{getTimeFromDate(createdAt)}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div ref={scroll}></div>
                            </div>
                            <form onSubmit={sendMessage} className="bottom-bar">
                                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} className="msg-input" placeholder="New Message" />
                                <div className="chat-user-options">
                                    <button type='submit' className="send-btn"><box-icon name='send' color="#ffffff"></box-icon></button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SponsorsMyChats);
