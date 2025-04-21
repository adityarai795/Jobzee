import React, { useState,useContext } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../main';
import {registerUser} from '../../api/user';
function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState(""); 
  const [name,setName]=useState(""); 
  const [role,setRole]=useState("");

 const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

 const handleRegister=async (e)=>{
  e.preventDefault();
  console.log(name,email,password,phone,role);
    try {
      // const { data } = await axios.post("http://localhost:4000/api/v1/user/register",{
      //   name,
      //   email,
      //   password,
      //   phone,
      //   role
      // },{withCredentials:true,headers:{
      //   "Content-Type":"application/json"
      // }});
      const userData={  name,
        email,
        password,
        phone,
        role
      }
      const {data}=await registerUser(userData)
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
          <h3>Create a new account</h3>
        </div>
        <form action="">
          <div className="inputTag">
            <label htmlFor="">Register As</label>
            <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
  
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Name</label>
            <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='aditya rai'/>
      
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Email</label>
            <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com'/>
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Phone</label>
            <div>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='123-456-7890'/>
         
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="">Password</label>
            <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********'/>
            </div>
          </div>
          <button onClick={handleRegister}>Register</button>
          <Link to={'/Login'}>Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="register" />
      </div>
    </div>
  )
}

export default Register
