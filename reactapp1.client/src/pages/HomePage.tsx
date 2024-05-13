import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <ul>
        <li>
          <Link to={"/table"}>Table</Link>
        </li>
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
