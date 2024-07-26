import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const RemoteAccessButton = ({ onRemoteAccess }) => {
  const handleRemoteAccess = () => {
    const participantId = prompt("Enter Student's Participant ID:");
    socket.emit('giveRemoteAccess', { participantId });
    if (onRemoteAccess) {
      onRemoteAccess(participantId);
    }
  };

  return (
    <button onClick={handleRemoteAccess}>Give Remote Access</button>
  );
};

export default RemoteAccessButton;
