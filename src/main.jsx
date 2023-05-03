import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DoctorRegistration from "./routes/doctorRegistration";
import PatientRegistration from "./routes/patientRegistration";
import Root from "./routes/root";
import PatientPage from "./routes/patientPage";
import LoginPatient from "./routes/loginPatient";
import LoginDoctor from "./routes/loginDoctor";
import LoginAdmin from "./routes/loginAdmin";
import ErrorPage from "./error-page";
import MedicalExamination, {loader as examinationLoader} from "./routes/medicalExamination";
import ExaminationForm from "./routes/examinationForm";
import DoctorPage from "./routes/doctorPage"
import DoctorPatientPage from "./routes/doctorPatientPage";
import DoctorExaminationPage from "./routes/doctorExaminationPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/patientLogin",
          element: <LoginPatient/>,
        },
        {
          path: "/doctorLogin",
          element: <LoginDoctor/>,
        },
        {
          path: "/adminLogin",
          element: <LoginAdmin/>,
        },
        {
          path: "/doctorRegistration",
          element: <DoctorRegistration/>,
        },
        {
          path: "/patientRegistration",
          element: <PatientRegistration/>
        },
        {
          path: "/loginError",
          element: <ErrorPage/>
        },
      ]
    },
    {
      path: '/patient/:userId',
      element: <PatientPage/>,
      children:[
        {
          path: '/patient/:userId/examination/:examinationId',
          element: <MedicalExamination/>,
          loader: examinationLoader
        },
        {
          path: '/patient/:userId/createExamination',
          element: <ExaminationForm/>
        }
      ]
    },
    {
      path: '/doctor/:userId',
      element: <DoctorPage/>,
      children:[
        {
          path: '/doctor/:userId/examination/:examinationId',
          element: <MedicalExamination/>,
          loader: examinationLoader
        },
        {
          path: '/doctor/:userId/createExamination',
          element: <ExaminationForm/>
        },
        {
          path: '/doctor/:userId/examinations',
          element: <DoctorExaminationPage/>
        },
        {
          path: '/doctor/:userId/patients',
          element: <DoctorPatientPage/>
        }
      ]
    }
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
