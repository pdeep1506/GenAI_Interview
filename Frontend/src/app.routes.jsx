import { createBrowserRouter} from 'react-router'

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import Home from './features/interview/pages/Home';
import Interview from "./features/interview/pages/Interview.jsx"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/",
        element: <ProtectedRoute><Home></Home></ProtectedRoute>

    },
    {
        path:"/interview/:interviewId",
        element: <ProtectedRoute><Interview /></ProtectedRoute>
    }

])