import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./components/EditProfile";
import Profile from "./pages/Profile";
import JobList from "./components/JobList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/edit-profile/:id" element={<EditProfile />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/jobs" element={<JobList />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
