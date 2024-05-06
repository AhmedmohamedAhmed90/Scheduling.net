import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link to={"/product"}>product</Link>
        </li>
        <li>
          <Link to={"/sendexception"}>Form</Link>
        </li>
        <li>
          <Link to={"/adminexceptionspanel"}>Admin Exception </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
