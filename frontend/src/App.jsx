import './App.css'
import { useState } from 'react'
import { useEffect,useContext} from 'react'
import {Context } from './main.jsx'
import Login from './components/Auth/Login.jsx'
 import Register from './components/Auth/Register.jsx'
 import Navbar from './components/Layout/Navbar.jsx'
 import Home from './components/Home/Home.jsx'
 import Footer from './components/Layout/Footer.jsx'
 import Jobs from './components/Job/Jobs.jsx'
import JobDetail from './components/Job/JobDetail.jsx'
 import MyJobs from './components/Job/MyJobs.jsx'
 import PostJobs from './components/Job/PostJob.jsx'
 import Application from './components/Application/Application.jsx'
 import MyApplications from './components/Application/MyApplication.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
function App() {

  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

  useEffect(() => {
    const fetchUser=async ()=>
    {
      // console.log("Fetching user data");
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getUser",{withCredentials:true});
        setUser(response.data.user);
        setIsAuthorized(true);
        toast.success("User data fetched successfully");
      } catch (error) {
        console.log("the error is", error);
        setIsAuthorized(false);
        // toast.error("Error fetching user data");
        
      }
    }
    fetchUser();
  }, [isAuthorized]);
    
 


 return (
  <>
  <BrowserRouter>
  <Navbar />  
  <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/" element={<Home />} />
  <Route path="/jobs/getJobs" element={<Jobs />} />
  <Route path="/jobs/:id" element={<JobDetail/>} />
  <Route path='job/post' element={<PostJobs />} />
  <Route path="/job/me" element={<MyJobs />} />
  <Route path="/application/:id" element={<Application />} />
  <Route path="/application/me" element={<MyApplications />} />
  <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />

  <Toaster />
  </BrowserRouter>
  
  </>
 )

 }

export default App