import {Route, Routes} from "react-router-dom";
import {Login} from "./page/Login";
import {Home} from "./page/Home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Register} from "./page/Register";


function App() {
  return (
    <>
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes><ToastContainer />
    </>
  );
}

export default App;
