import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyTaskModal from "../MyTaskModal/MyTaskModal";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

 useEffect(() =>{
  fetch(`https://task-manager-server-eight.vercel.app/userTask/${user?.email}`)
  .then((res) => res.json())
  .then((data) => {
    setTasks(data);
  });
 }, [user])

  return (
    <div className="container">
      <div className="row g-3">
        {tasks?.map((task) => (
          <MyTaskModal task={task} />
        ))}
      </div>
    </div>
  );
};

export default MyTask;
