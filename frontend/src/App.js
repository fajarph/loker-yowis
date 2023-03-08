import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import JobList from "./components/JobList";
import ProfileUser from "./components/ProfileUser";
import Beranda from "./pages/Beranda";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />}/>
          <Route path="/dashboard/:id" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/edit/profile/:id" element={<EditProfile />}/>
          <Route path="/profile/:id" element={<ProfileUser />}/>
          <Route path="/jobs" element={<JobList />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
