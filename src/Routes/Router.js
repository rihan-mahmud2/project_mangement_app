import { createBrowserRouter } from "react-router-dom";
import AddTask from "../Components/AddTask/AddTask";
import CompleteTask from "../Components/CompleteTask/CompleteTask";
import Home from "../Components/Home/Home";
import MyTask from "../Components/MyTask/MyTask";
import Main from "../Layouts/Main";
import PrivateRout from "../PrivateRout/PrivateRout";
import Login from "../Registration/Login";
import SignUp from "../Registration/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add_task",
        element: <AddTask />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/myTask",
        element: (
          <PrivateRout>
            <MyTask />
          </PrivateRout>
        ),
      },
      {
        path: "/completeTask",
        element: (
          <PrivateRout>
            <CompleteTask />
          </PrivateRout>
        ),
      },
    ],
  },
]);
