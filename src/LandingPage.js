import { Link } from "react-router-dom";
import "./app.css";

function LandingPage() {
  return (
    <div>
      <div className="todo-wrapper-landing">
        <div className="img-landing">
          <img src="images/office.jpg" alt="checklist" />
        </div>
        <h2>Get things done with ToDo App</h2>
        <div className="landing-btn-container">
          <button className="landing-btn">
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Created lists
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
    </div>
  );
}

export default LandingPage;
