import "./home.styles.scss"

const Home = () => {
    return (  
      <div className="container">
        <div className="formContainer">
            <h1>{`<>DevRooms</>`}</h1>
            <input className="input" placeholder="Username..."/>
            
            <select className="input">
                <option>-- Select Room --</option>
                <option value="javascript">JavaScript</option>
                <option value="node">Node</option>
                <option value="express">Express</option>
                <option value="react">React</option>
            </select>

            <button className="btn btn-secondary">Join Room</button>
        </div>
      </div>  
    );
}
 
export default Home;