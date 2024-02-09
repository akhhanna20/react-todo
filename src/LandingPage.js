import { Link } from "react-router-dom";
import "./app.css";
//import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <div className="todo-wrapper">
        {/* <h1>Hanna Akhramchuk</h1>
        <h3>front-end developer</h3> */}

        {/* <img src="images/planner.jpg" alt="checklist" /> */}

        <h2>Get things done with ToDo App</h2>

        <div className="landing-btn-container">
          <button className="landing-btn">
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Created list
            </Link>
          </button>
          <button className="landing-btn">
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/newList"
            >
              New list
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
