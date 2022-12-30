import { useState, React, useContext } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const AddTaskModal = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [taskName, setTaskName] = useState("");
  const isFilled = taskName !== "";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const task = taskName;
    const img = form.image.files[0];
    const from = new FormData();
    from.append("image", img);

    const url =
      "https://api.imgbb.com/1/upload?key=244ab63b6e364b2b662a2ef1cbd459fc";

    fetch(url, {
      method: "POST",
      "content-type": "application/json",
      body: from,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data?.display_url);
        const taskInfo = {
          taskTitle: task,
          imageUrl: data.data?.display_url,
          email: user?.email,
        };
        setTaskName("");

        //  storing the data into the database

        fetch("https://task-manager-server-eight.vercel.app/userTask", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>Add Task</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="taskName"
                placeholder="Learning Redux"
                autoFocus
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}

            <div class="text-center">
              <label for="dropzone-file" class="">
                <div class="pt-5 pb-6">
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  name="image"
                  type="file"
                  class="hidden"
                />
              </label>
            </div>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {user?.email ? (
              <Button
                variant="primary"
                disabled={!isFilled}
                type="submit"
                onClick={handleClose}
              >
                Submit
              </Button>
            ) : (
              <span>
                {" "}
                Please{" "}
                <Nav.Link
                  className="btn-link d-inline"
                  as={NavLink}
                  to="/login"
                >
                  Login
                </Nav.Link>
                to use our service
              </span>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskModal;
