import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const CompleteTaskCards = ({ task }) => {
  const { user } = useContext(AuthContext);

  const handleComplet = () => {
    fetch(`http://localhost:5000/userTask/${task?._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="col-sm-6">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={task?.imageUrl} />
        <Card.Body>
          <Card.Title>{task?.taskTitle}</Card.Title>

          {task?.status === "completed" ? (
            <Button onClick={handleComplet} variant="primary">
              completed
            </Button>
          ) : (
            <Button onClick={handleComplet} variant="primary">
              Incomplete
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CompleteTaskCards;
