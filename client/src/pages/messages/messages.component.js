import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/context';
import './messages.styles.scss'

const Messages = () => {
    const [messagesRecieved, setMessagesReceived] = useState([])
    const { socket } = useContext(AppContext)

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__
                }
            ])
        });

        return () => socket.off('receive_message')
    }, [socket]);

    const formatDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        return date.toLocaleString();
    }

    return (
        <div className='messagesColumn'>
            {messagesRecieved.map((msg, i) => {
                return (
                    <div className='message' key={i}>
                        <div className='messageMetaContainer'>
                            <span className='msgMeta'>{msg.username}</span>
                            <span className='msgMeta'>
                                {formatDateFromTimestamp(msg.__createdtime__)}
                            </span>

                        </div>
                        <p className='msgText'>{msg.message}</p>
                    </div>                
                )
            })}
        </div>
    );
};

export default Messages;