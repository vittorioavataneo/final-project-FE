import { 
    Outlet,
    NavLink,
} from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import LandingPage from "../routes/landingPage";
import mainPage from "../assets/mainPage.mp4";



export default function Root() {

    return (
      <>
          <video src={mainPage} autoPlay loop muted />
          <Navbar/>
          <LandingPage/>
      </>
    );
}
