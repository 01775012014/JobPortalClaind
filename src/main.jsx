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

import { AuthProvider } from './context/AuthContext';
import JobsDetels from './Page/JobsData/JobsDetels';
import AddJobs from "./Page/AddJobs/AddJobs.jsx"
import JobCard from './Page/AddJobs/components/JobCard.jsx';
import AddJobForm from './Page/AddJobs/components/AddJobForm.jsx';
import JobDetailModal from './Page/AddJobs/components/JobDetailModal.jsx';



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
        path:'/jobs/:id',
        element: <JobsDetels/>,
        loader: async ({params}) => {
          const response = await fetch(`http://localhost:3000/jobs/${params.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch job data');
          }
          return response.json();
        }
      }
      ,
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path:"/addjobs",
        element: <AddJobs/>
      },
      {
        path: "/jobsCard",
        element:<JobCard/>
      },
      {
        path: "/addjobfom",
        element: <AddJobForm/>
      },
      {
        path:"/jobsDetels",
        element: <JobsDetels/>
      },
      {
        path: "/jobs-detels-model",
        element: <JobDetailModal/>
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
