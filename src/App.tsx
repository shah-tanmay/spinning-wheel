import "./App.css";
import CustomWheel from "./components/Wheel";
//@ts-ignore
import Logo from "../src/logo.png";

function App() {
  return (
    <div className="main">
      <img
        src={Logo}
        alt="Logo"
        width={500}
        height={150}
        style={{ position: "absolute" }}
      />
      <div className="wheel">
        <CustomWheel />
      </div>
    </div>
  );
}

export default App;
