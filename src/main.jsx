import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainRout from './MainRout/MainRout.jsx';
import Home from './Page/Home.jsx';
import Login from './Page/Login.jsx';
import Register from './Page/Register.jsx';
import Dashboard from './Page/Dashboard.jsx';
import { AuthProvider } from './context/AuthContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      }
    ]

  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
