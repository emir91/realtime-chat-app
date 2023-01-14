import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/context";
import "./home.styles.scss"

const defaultFormFields = {
  username: '',
  room: ''
}

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {setUser, setRoom, socket} = useContext(AppContext)
  const navigate = useNavigate()

  const {username, room} = formFields

  const onChangeHandler = (e) => {
    const {name, value} = e.target

    setFormFields({...formFields, [name]: value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()


    if(username && room) {
      setUser(username)
      setRoom(room)

      socket.emit('join_room', { username, room })
  
      resetFormFields()

      navigate('/chat', {replace: true })

    }

  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

    return (  
      <div className="container">
        <div className="formContainer">
            <h1>{`<>DevRooms</>`}</h1>
            <form onSubmit={onSubmitHandler}>
              <input className="input" placeholder="Username..." name='username' value={username} onChange={onChangeHandler} />
            
              <select className="input"  name='room' value={room} onChange={onChangeHandler}>
                <option>-- Select Room --</option>
                <option value="javascript">JavaScript</option>
                <option value="node">Node</option>
                <option value="express">Express</option>
                <option value="react">React</option>
              </select>

              <button type='submit' className="btn btn-secondary">Join Room</button>  
            </form>    
        </div>
      </div>  
    );
}
 
export default Home;