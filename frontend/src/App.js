import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import PrivateRoute from "./Route/privateRoute";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element=<Register /> />

        <Route path="/user" element=<PrivateRoute />>
          <Route path="home" element=<HomePage /> />
        </Route>
        <Route path="*" element=<Pagenotfound /> />
      </Routes>
    </>
  );
}

export default App;
