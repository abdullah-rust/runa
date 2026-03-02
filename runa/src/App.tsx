import { Route,Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

// import pages

function App() {


  return (
    <main>

<Routes>
  <Route path="/" element={<Login/>} />
</Routes>

    </main>
  );
}

export default App;
