import { createContext, useState } from "react";
import io from 'socket.io-client'; 

const socket = io.connect('http://localhost:4000')

export const AppContext = createContext({
    user: null,
    setUser: () => null,
    room: null,
    setRoom: () => null,
    socket
})

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [room, setRoom] = useState(null)

    const value = {user, setUser, room, setRoom, socket}
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
} 