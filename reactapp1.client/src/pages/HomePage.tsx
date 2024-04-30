import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link to={"/product"}>product</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
