import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import JobList from "./components/JobList";
import ProfileUser from "./components/ProfileUser";
import Beranda from "./pages/Beranda";
import Dashboard from "./components/Dashboard";
import AddJobs from "./components/AddJobs";
import JobDetail from "./components/JobDetail";
import EditJobs from "./components/EditJobs";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/edit/profile" element={<EditProfile />}/>
          <Route path="/profile" element={<ProfileUser />}/>
          <Route path="/jobs" element={<JobList />}/>
          <Route path="/add/job" element={<AddJobs />}/>
          <Route path="/edit/jobs/:id" element={<EditJobs />}/>
          <Route path="/job/detail/:id" element={<JobDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
