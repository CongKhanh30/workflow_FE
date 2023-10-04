import logo from './logo.svg';
import './App.css';
import Home from "./component/home/home";
import Login from "./component/login/login";
import {Route, Routes} from "react-router";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
  );
}

export default App;
