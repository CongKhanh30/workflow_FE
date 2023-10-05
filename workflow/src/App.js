import logo from './logo.svg';
import './App.css';
import Home from "./component/home/Home";
import {Route, Routes} from "react-router";
import Register from "./component/register/Register";

function App() {
    return (
        <div className="App">
            <Routes>
                {/*<Route path={"/login"} element={<Login/>}></Route>*/}
                <Route path={"/register"} element={<Register/>}></Route>

            </Routes>

        </div>
    );
}

export default App;
