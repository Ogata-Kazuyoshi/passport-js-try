import axios from 'axios';
import React, { useState } from 'react';

const Signup = (props) => {
  const { onLogin } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    if (username !== '' && password !== '') {
      const sendData = { username, password };
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/signup',
        sendData,
        { withCredentials: true }
      );
      console.log(response);
      onLogin();
    }
  };
  return (
    <div>
      <h1>新規登録</h1>
      <label htmlFor="">ユーザー名</label>
      <input type="text" value={username} onChange={userChange} />
      <br />
      <br />
      <label htmlFor="">パスワード</label>
      <input type="text" value={password} onChange={passwordChange} />
      <br />
      <button onClick={submitHandler}>登録</button>
      <br />
    </div>
  );
};

export default Signup;
