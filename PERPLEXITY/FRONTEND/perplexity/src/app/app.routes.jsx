import {createBrowserRouter} from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Navigate from "../features/auth/pages/navigate.jsx"
import Dashboard from "../features/chats/pages/Dashboard.jsx";

export const router=createBrowserRouter([
    {
        path:"login",
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    },
    {
        path:"/",
        
        element:<protected>
        <Dashboard/>
        </protected>
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }

])