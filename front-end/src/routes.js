import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import Home from "./pages/home/Home"

const routes = [

    { 
        path: '/sign-in',
        element: Signin
    },
    {
        path: '/sign-up',
        element: Signup
    },
    {
        path: '/forgot-password',
        element: ForgotPassword
    },
    {
        path: '/reset-password/:id/:token',
        element: ResetPassword
    },
    {
        path: '/home',
        element: Home
    }
]

export { routes }