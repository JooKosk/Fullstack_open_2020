import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  password,
  username,
}) => {
  return (
    <div style={{ width: '400px', paddingLeft: '25px', paddingTop: '15px' }}>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          style={{ width: '60px' }}
          size="sm"
          variant="info"
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
