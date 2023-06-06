import axios from 'axios';
import {useContext} from 'react';
import {DroneContext} from './DroneProvider';

const port = '5000';

// Our original function, now without a default argument
async function sendDataToNano(command, data, ip) {
  try {
    const response = await axios.post(`http://${ip}:${port}/send-data`, {
      source: 'app',
      command: command,
      data: data,
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error sending data: ${error}`);
    throw error;
  }
}

function useSendDataToNano() {
  const context = useContext(DroneContext);

  return async (command, data, ip = context.ip) => {
    return await sendDataToNano(command, data, ip);
  };
}

export default useSendDataToNano;
