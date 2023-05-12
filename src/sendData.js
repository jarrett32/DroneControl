import axios from 'axios';

// Function to send data
let ip = '172.20.10.7';
let port = '5000';
async function sendDataToNano(messageText) {
  try {
    const response = await axios.post(`http://${ip}:${port}/send-data`, {
      message: messageText,
    });

    console.log(response.data);
  } catch (error) {
    console.error(`Error sending data: ${error}`);
  }
}

export default sendDataToNano;
