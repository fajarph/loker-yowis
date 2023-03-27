import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/FormEditProfile";
import JobList from "./components/JobList";
import ProfileUser from "./components/ProfileUser";
import Dashboard from "./components/Dashboard";
import JobDetail from "./components/JobDetail";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/edit/profile" element={<EditProfile />}/>
          <Route path="/profile" element={<ProfileUser />}/>
          <Route path="/jobs" element={<JobList />}/>
          <Route path="/add/jobs" element={<AddJob />}/>
          <Route path="/edit/jobs/:id" element={<EditJob />}/>
          <Route path="/jobs/detail/:id" element={<JobDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
