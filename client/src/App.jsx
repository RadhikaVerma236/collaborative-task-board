import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Board from './pages/Board';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ActivityLog from "./pages/ActivityLog";
import MyTasks from "./pages/MyTasks";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/activity" element={<ActivityLog />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
