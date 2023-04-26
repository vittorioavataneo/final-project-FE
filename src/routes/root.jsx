import { 
    Outlet,
    NavLink,
} from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import LandingPage from "../routes/landingPage";


export default function Root() {

    return (
      <>
        <Navbar/>
        <LandingPage/>
      </>
    );
  }