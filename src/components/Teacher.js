import React, { useState } from 'react';
import RemoteAccessButton from './RemoteAccessButton';

const Teacher = () => {
  const [remoteAccessStudent, setRemoteAccessStudent] = useState(null);
  const [textEnteredByTeacher, setTextEnteredByTeacher] = useState('')
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <RemoteAccessButton onRemoteAccess={(participantId) => setRemoteAccessStudent(participantId)} />
      {remoteAccessStudent && <p>Remote access granted to student with ID: {remoteAccessStudent}</p>}
      <input
      type='text'
      value={textEnteredByTeacher}
      onChange={(e)=>{setTextEnteredByTeacher(e.target.value)}}
      placeholder='Student will enter here!'
      />
    </div>
  );
};

export default Teacher;
