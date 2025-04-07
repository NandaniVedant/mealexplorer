// src/components/Login.jsx
import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');

  return (
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && setUser(email)}
      className="form-control d-inline-block w-auto"
    />
  );
};

export default Login;
