import {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/context';
import './room-and-users.styles.scss';

const RoomAndUsers = () => {
    const [roomUsers, setRoomUsers] = useState([])
    const { room, socket, user } = useContext(AppContext)

    const navigate = useNavigate()

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            setRoomUsers(data)
        });

        return () => socket.off('chatroom_users')
    }, [socket])

    const leaveRoom = () => {
        const __createdtime__ = Date.now();

        socket.emit('leave_room', { user, room, __createdtime__ })

        navigate('/', { replace: true })
    }

    return (
        <div className='roomAndUsersColumn'>
            <h2 className='roomTitle'>{room}</h2>

            <div>
                {roomUsers.length > 0 && <h5 className='usersTitle'>Users:</h5>}
                <ul className='userList'>
                    {roomUsers.map((user) => {
                        return (
                            <li style={{
                                fontWeight: `${user.user === user ? 'bold' : 'normal'}`
                            }} key={user.id}>
                                {user.username}
                            </li>
                        )
                      })
                    }
                </ul>
            </div>
           <button className='btn btn-outline' onClick={leaveRoom}>
                Leave
            </button>
        </div>
    );
};

export default RoomAndUsers;