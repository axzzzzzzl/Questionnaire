import { createBrowserRouter, defer, Navigate } from "react-router-dom";
import { Editor } from '../pages/Editor';
import { Login } from '../pages/Login';
import { Hello } from '../pages/Hello';
import { Home } from '../pages/Home';
import { LoginLayout } from '../components/Layout/LoginLayout';
import { ProtectedLayout } from '../components/Layout/ProtectedLayout';
import { get } from "../services/axios";

const getUserData = async() => {
  const response = await get("/user");
  // console.log("经过Loader", response.data.data.username)
  return defer({ userPromise: response.data.data.username });
}
export const router = createBrowserRouter([
    {
      path: "/Questionnaire/",
      children: [
        {
          element: <ProtectedLayout />,
          loader: getUserData,
          children: [
            {
              path: "create",
              element: <Editor />
            },
            {
              path: ":id/edit",
              element: <Editor />,
            },
            {
              path: "",
              element: <Hello />
            },
            {
              path: "*",
              element: <Hello />
            }
          ]
        },
        {
          element: <LoginLayout />,
          loader: getUserData,
          children: [
            {
              path: "login",
              element: <Login />
            }
          ]
        },
        {
          path: "hello",
          element: <Home />
        },
      ]
    }
]);