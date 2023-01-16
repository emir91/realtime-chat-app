import React from 'react';
import Messages from '../messages/messages.component';
import './chat.styles.scss'

const Chat = () => {
    return (
        <div className='chatContainer'>
            <div>
                <Messages />
            </div>
        </div>
    );
};

export default Chat;