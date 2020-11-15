import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar, Form } from 'react-bootstrap'

const Navibar = ({ user, handleLogout }) => {
  const padding = {
    padding: 10,
  }
  return (
    <Navbar
      collapseOnSelect
      style={{ backgroundColor: 'lightblue' }}
      expand="lg"
      variant="light"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Navbar.Text style={padding}>{user.name} logged in</Navbar.Text>
        </Nav>
        <Form inline>
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>{' '}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navibar
