import axios from "axios";

export default async function harperSaveMessage(message, username, room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;
  
    const data = JSON.stringify({
      operation: 'insert',
      schema: 'realtime_chat_app',
      table: 'messages',
      records: [
        {
          message,
          username,
          room,
        },
      ],
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

        console.log('Message send successfully');

        return result

    } catch (error) {
        console.log(`Error while saving to the DB: ${error.message}`)
    }
}
