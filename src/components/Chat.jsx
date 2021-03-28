import React, { useEffect, useState } from 'react';
import "../static/css/Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { selectUser } from '../features/userSlice';
import { selectChannelName, selectChannelId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import db from "../firebase";
import firebase from 'firebase';

const Chat = () => {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(channelId){
            db.collection("channels").doc(channelId).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
        
    },[channelId])

    const sendMessage = e => {
        e.preventDefault();
        db.collection("channels").doc(channelId).collection("messages").add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader 
                channelName={channelName}
            />

            <div className="chat__messages">
                {
                    messages.map((message) => (
                        <Message 
                            timestamp={message.timestamp}
                            message={message.message}
                            user={message.user}
                        />
                    ))
                }
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large"/>
                <form onSubmit={sendMessage}>
                    <input 
                        value={input}
                        placeholder={`Message #${channelName}`}
                        onChange={e => setInput(e.target.value)}
                        disabled={!channelId}
                    />
                    <button className="chat__inputButton" type="submit">Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
