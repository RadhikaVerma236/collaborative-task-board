import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const Board = lazy(() => import("./pages/Board"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ActivityLog = lazy(() => import("./pages/ActivityLog"));
const MyTasks = lazy(() => import("./pages/MyTasks"));

function App() {

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/activity" element={<ActivityLog />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
