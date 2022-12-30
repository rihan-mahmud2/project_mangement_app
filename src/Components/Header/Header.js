import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import AddTaskModal from "../Modals/AddTaskModal";

const Header = () => {
  const { user, logOut, loading, setLoading } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Nav.Link} to="/">
          Managerial app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <AddTaskModal />
            <Nav.Link as={NavLink} to="/completeTask">
              Complete Task
            </Nav.Link>
            <Nav.Link as={NavLink} to="/myTask">
              My Task
            </Nav.Link>
            {!user?.email && !loading ? (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            ) : (
              <Button onClick={handleLogOut}>LogOut</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
