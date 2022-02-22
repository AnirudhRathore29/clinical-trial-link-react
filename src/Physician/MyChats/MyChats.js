import '../../Patient/MyChats/myChats.css';

const PhysicianMyChats = () => {

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
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head online">
                                            <img src="/images/user-img-1.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Stephanie Phillips</div>
                                        <div className="last-message">Yeah, the presentation is scheduled for tomorrow, will you be able to make it?</div>
                                    </div>
                                    <div className="last new">12:32</div>
                                </div>
                                <div className="thread active">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-2.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joe Faraah</div>
                                        <div className="last-message">You: Awesome, Thanks. I look forward to meeting you in the morning.</div>
                                    </div>
                                    <div className="last">12:32</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-3.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joshua Spackle Mid land West View</div>
                                        <div className="last-message">Got it! Thanks for sending that!</div>
                                    </div>
                                    <div className="last">16:47</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-2.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joe Faraah</div>
                                        <div className="last-message">You: Awesome, Thanks. I look forward to meeting you in the morning.</div>
                                    </div>
                                    <div className="last">12:32</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-3.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joshua Spackle Mid land West View</div>
                                        <div className="last-message">Got it! Thanks for sending that!</div>
                                    </div>
                                    <div className="last">16:47</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-2.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joe Faraah</div>
                                        <div className="last-message">You: Awesome, Thanks. I look forward to meeting you in the morning.</div>
                                    </div>
                                    <div className="last">12:32</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-3.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joshua Spackle Mid land West View</div>
                                        <div className="last-message">Got it! Thanks for sending that!</div>
                                    </div>
                                    <div className="last">16:47</div>
                                </div>
                                <div className="thread">
                                    <div className="details">
                                        <div className="user-head offline">
                                            <img src="/images/user-img-3.jpg" alt="user" />
                                        </div>
                                        <div className="user-name">Joshua Spackle Mid land West View</div>
                                        <div className="last-message">Got it! Thanks for sending that!</div>
                                    </div>
                                    <div className="last">16:47</div>
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
                                    <div className="status online" />
                                </div>
                                <div className="chat-header-btn">
                                    <div className="call"><i className="fas fa-phone-volume" /></div>
                                </div>
                            </div>
                            <div className="messages" id="messages">
                                <div className="date-split">Nothing up here!</div>
                                <div className="message">
                                    <div className="content">I've updated the website content now Fiona, I hope that's all okay? Please let me know of any additional changes</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="message fromme">
                                    <div className="content">Ah! That's Great, Joe. IOU you one!<br />I've got to go now, I'll catch up with you tomorrow.</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="message">
                                    <div className="content">No Worries, I'm glad you're happy!</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="message">
                                    <div className="content">Sure thing, talk to you later, Fiona</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="date-split">TODAY</div>
                                <div className="message fromme">
                                    <div className="content">Hey Joe, Can you check over the images for me, please?</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="message">
                                    <div className="content">I've already done it, I'll get the presentation together now.</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                                <div className="message fromme">
                                    <div className="content">Awesome, Thanks. I look forward to meeting you in the morning.</div>
                                    <p className='message-time'>12:32</p>
                                </div>
                            </div>
                            <div className="bottom-bar">
                                <textarea className="msg-input" placeholder="New Message" defaultValue={""} />
                                <div className="chat-user-options">
                                    {/* <div className="attachment-btn"><i className="fas fa-paperclip" /><input className="form-control" type="file" /></div> */}
                                    <div className="send-btn"><box-icon name='send' color="#ffffff"></box-icon></div>
                                </div>
                            </div></main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhysicianMyChats;
