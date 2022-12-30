import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      {user?.email ? (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      ) : (
        <span>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
          To Track your work
        </span>
      )}
    </Form>
  );
};

export default AddTask;
