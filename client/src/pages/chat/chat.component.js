import React from 'react';
import Messages from '../../components/messages/messages.component';
import RoomAndUsers from '../../components/room-and-users/room-and-users.component';
import SendMessage from '../../components/send-messages/send-messages.component';
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