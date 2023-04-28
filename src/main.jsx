import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./routes/login";
import DoctorRegistration from "./routes/doctorRegistration";
import PatientRegistration from "./routes/patientRegistration";
import Root from "./routes/root";
import PatientPage from "./routes/patientPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/patientLogin",
          element: <Login/>,
        },
        {
          path: "/doctorLogin",
          element: <Login/>,
        },
        {
          path: "/adminLogin",
          element: <Login/>,
        },
        {
          path: "/doctorRegistration",
          element: <DoctorRegistration/>,
        },
        {
          path: "/patientRegistration",
          element: <PatientRegistration/>
        },
      ]
    },
    {
      path: '/patient/:id',
      element: <PatientPage/>
    },
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
