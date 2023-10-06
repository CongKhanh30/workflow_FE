import logo from './logo.svg';
import './App.css';
import Home from "./component/home/Home";
import {Route, Routes} from "react-router";
import Register from "./component/register/Register";
import Login from "./component/login/login";

import Board from "./component/board";
import {Provider} from "react-redux";
import store from "./redux/store";
import HomeTeams from "./component/home/homeTeams";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path="/homeTeam" element={<HomeTeams/>} />
                <Route path="/home" element={<Home/>} />
                <Route path={'/b'} element={<Board/>}/>

            </Routes>
        </Provider>

    );
}

export default App;
