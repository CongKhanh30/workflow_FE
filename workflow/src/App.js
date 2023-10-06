import logo from './logo.svg';
import './App.css';
import Home from "./component/home/home";
import Login from "./component/login/login";
import {Route, Routes} from "react-router";
import Board from "./component/board";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
      <Provider store={store}>
          <Routes>
              {/*<Route path="/" element={<Login/>} />*/}
              {/*<Route path="/home" element={<Home/>} />*/}
              <Route path={'/'} element={<Board/>}/>
          </Routes>
      </Provider>

  );
}

export default App;
