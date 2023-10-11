import './App.css';
import {Route, Routes} from "react-router";
import Register from "./component/register/Register";

import Board from "./component/board";
import {Provider} from "react-redux";
import store from "./redux/store";
import HomeTeams from "./component/home/homeTeams";
import Login from "./component/login/Login";
import CreateHomeTeams from "./component/home/createHomeTeams";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path="/homeTeam" element={<HomeTeams/>} />
                <Route path={'/b/:id'} element={<Board/>}/>
                <Route path={'/createTeam'} element={<CreateHomeTeams/>}/>

            </Routes>
        </Provider>

    );
}

export default App;
