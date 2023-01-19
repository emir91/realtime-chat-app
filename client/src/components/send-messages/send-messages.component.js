import { useContext, useState } from "react";
import { AppContext } from "../../contexts/context";

import './send-messages.styles.scss'

const SendMessage = () => {
    const [message, setMessage] = useState('')
    const { room, socket, user } = useContext(AppContext)

    const sendMessage = (e) => {
        e.preventDefault()
        if(message !== '') {
            const __createdtime__ = Date.now();

            // Send message to server. We can't specify who we send the message to from the frontend. 
            // We can only send to server. Server can then send message to rest of users in room
            socket.emit('send_message', {user, room, message, __createdtime__ });

            setMessage('')
        }
    }

    return (
        <div className="sendMessageContainer">
            <form onSubmit={sendMessage}>
                <input 
                    className="messageInput" 
                    value={message} onChange={(e) => setMessage(e.target.value)} 
                    placeholder='Message...'
                />
                <button className="btn btn-primary" type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default SendMessage;