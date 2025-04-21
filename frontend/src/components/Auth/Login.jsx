import React, { useState,useContext } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../main';
import {loginUser} from '../../api/user'
function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [role,setRole]=useState("");

 const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

 const handleLogin=async (e)=>{
  e.preventDefault();
  console.log(email,password,role);
    try {
      console.log(email ,password,role);
      // const { data } = await axios.post("http://localhost:4000/api/v1/user/login",{
    // {
    //     email,
    //     password,
    //     role
    //   },{withCredentials:true,headers:{
    //     "Content-Type":"application/json"
    //   }});
    const credentials = { email, password,role };
      const {data}=await loginUser(credentials)
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      setUser(data.user);
    } catch (error) {
      console.log(error); // for debugging
    
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      setIsAuthorized(false);
    }
    
 };
 if(isAuthorized){
  return <Navigate to={"/"} />
 }
  return (
    <div className='authPage'>
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Login Account</h3>
        </div>
        <form action="">
          <div className="inputTag">
            <label htmlFor="">Login As</label>
            <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
  
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Email</label>
            <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com'/>
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Password</label>
            <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********'/>
            </div>
          </div>
          <button onClick={handleLogin}>Login</button>
          <Link to={'/Register'}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  )
}

export default Login
