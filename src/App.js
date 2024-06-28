import {Route, Routes} from "react-router-dom";
import {Login} from "./page/Login";
import {Home} from "./page/Home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Register} from "./page/Register";
import {PlayerDetail} from "./component/PlayerDetail";
import {CreatePlayer} from "./component/CreatePlayer";


function App() {
  return (
    <>
      <Routes>
          <Route path="" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/player/details/:id" element={<PlayerDetail/>}/>
          <Route path="/player/create" element={<CreatePlayer/>}/>
      </Routes><ToastContainer />
    </>
  );
}

export default App;
