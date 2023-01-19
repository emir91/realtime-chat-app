import axios from "axios";

export default async function harperGetMessages(room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;
  
    const data = JSON.stringify({
      operation: 'sql',
      sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100` 
    });
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${dbPw}`,
      }
    };

    try {
        const response = await axios.post(dbUrl, data, config) 

        const result = JSON.stringify(response.data)

        console.log('Messages fetched successfully');

        return result

    } catch (error) {
        console.log(`Error while getting messages from the DB: ${error.message}`)
    }
}
