import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket('wss://https://back-notification.onrender.com');

    // Handle connection opening
    socket.onopen = () => {
        console.log('Connected to the WebSocket server');
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Notification received:', data);
        setCount((prev)=>prev+1)
        setNotifications((prev) => [...prev, data.message]);
    };

    // Handle connection errors
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Handle connection closure
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => {
        socket.close();
    };
}, []);
  const handleClick=async()=>{
    fetch('http://localhost:5000/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count:  count}),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Logs: "Update notification sent to all clients."
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
  }

  return (
    <>
      <button style={{width:"40px",height:"30px"}} type='button' value={count} onClick={handleClick}>{count}</button>
      <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default App
