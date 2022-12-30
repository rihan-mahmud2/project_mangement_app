import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyTaskModal from "../MyTaskModal/MyTaskModal";
import CompleteTaskCards from "./CompleteTaskCards";

const CompleteTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(
      ` https://task-manager-server-eight.vercel.app/userTask?email=${user?.email}&status=completed`
    )
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [user]);
  console.log(tasks);

  return (
    <div className="container">
      <div className="row g-3">
        {tasks?.map((task) => (
          <CompleteTaskCards task={task} />
        ))}
      </div>
    </div>
  );
};

export default CompleteTask;
