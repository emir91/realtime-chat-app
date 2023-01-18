import React from 'react';
import Messages from '../messages/messages.component';
import RoomAndUsers from '../room-and-users/room-and-users.component';
import SendMessage from '../send-messages/send-messages.component';
import './chat.styles.scss'

const Chat = () => {
    return (
        <div className='chatContainer'>
            <RoomAndUsers />
            <div>
                <Messages />
                <SendMessage />
            </div>
        </div>
    );
};

export default Chat;