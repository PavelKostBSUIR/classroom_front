import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Login from "./components/login/Login";
import RequireAuth from "./components/login/RequireAuth";
import UserList from "./components/user/userList";
import UserNavbar from "./components/user/userNavbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="member" element={<UserList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
