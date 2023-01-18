import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../contexts/context';
import './messages.styles.scss'

const Messages = () => {
    const [messagesRecieved, setMessagesReceived] = useState([])
    const { socket } = useContext(AppContext)

    const messageColumnRef = useRef(null)

    useEffect(() => {
        socket.on('receive_message', (data) => {
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

    useEffect(() => {
        socket.on('last_100_messages', (last100Messages) => {
            let recentMessages = JSON.parse(last100Messages);

            recentMessages = sortMessagesByDate(recentMessages);
    
            setMessagesReceived((state) => [...recentMessages, ...state])    
        })

        return () => socket.off('last_100_messages')
    }, [socket])

    useEffect(() => {
        messageColumnRef.current.scrollTop = messageColumnRef.current.scrollHeight
    }, [messagesRecieved])

    const sortMessagesByDate = (messages) => {
        return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__) )
    }

    const formatDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        return date.toLocaleString();
    }

    return (
        <div className='messagesColumn' ref={messageColumnRef}>
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