import './App.css';
import {Route, Routes} from "react-router";
import Register from "./component/register/Register";

import Board from "./component/Board";
import {Provider} from "react-redux";
import store from "./redux/store";
import HomeTeams from "./component/home/HomeTeams";
import Login from "./component/login/Login";
import CreateHomeTeams from "./component/home/CreateHomeTeams";
import CreateBoard from "./board/CreateBoard";
import ChangePassword from "./component/login/ChangePassword";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path={"/changePassword"} element={<ChangePassword/>}></Route>
                <Route path="/homeTeam" element={<HomeTeams/>} />
                <Route path={'/b/:id'} element={<Board/>}/>
                <Route path={'/createTeam'} element={<CreateHomeTeams/>}/>
                <Route path={'/createBoard/:id'} element={<CreateBoard/>}/>

            </Routes>
        </Provider>

    );
}

export default App;
