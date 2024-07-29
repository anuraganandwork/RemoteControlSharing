import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const Student = () => {
  const [participantId, setParticipantId] = useState('');
  const [remoteAccess, setRemoteAccess] = useState(false);

  useEffect(() => {
    socket.on('remoteAccessGranted', () => {
      console.log('Remote access granted');
      setRemoteAccess(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleMouseClick);
      document.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleJoin = () => {
    socket.emit('joinSession', { participantId });
  };

  const handleMouseMove = (event) => {
    console.log("Student is moving",event);
    const { clientX: x, clientY: y } = event;
    socket.emit('mouseMove', { x, y });
  };

  const handleMouseClick = () => {
    socket.emit('mouseClick');
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    socket.emit('keyTap', key);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <input
        type="text"
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        placeholder="Enter Participant ID"
      />
      <button onClick={handleJoin}>Join Session</button>
      {remoteAccess && <p>Remote access granted! You can now control the teacher's interface.</p>}
    </div>
  );
};

export default Student;
