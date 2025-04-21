import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {getAllJobs,createJob,getMyJobs,updateJob,deleteJob,jobDetail} from '../../api/job'
function PostJob() {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [city,setCity]=useState("");
  const [location,setLocation]=useState("");
  const [Salaryfrom,setSalaryFrom]=useState("");
  const [Salaryto,setSalaryTo]=useState("");

  const {isAuthorized,user}=useContext(Context);
  const handleJobPost=async(e)=>
  {

    e.preventDefault();
    const jobData={
      title,
      description,
      category,
      city,
      location,
      Salaryfrom,
      Salaryto
    }
    console.log(jobData)
    // await axios.post("http://localhost:4000/api/v1/job/post",  {
    //   title,
    //   description,
    //   category,
    //   city,
    //   location,
    //   Salaryfrom,
    //   Salaryto
    // },{withCredentials:true,headers:{"Content-Type":"application/json"}})
    await createJob(jobData)
    .then((res)=>
    {
      toast.success(res.data.message);
      setTitle("");
      setDescription("");
      setCategory("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      navigateTo("/");
    })
    .catch((error)=>
    {
      toast.error(error.response.data.message);
    })
  }
  const navigateTo=useNavigate();
  if(!isAuthorized || user && user.role !="Employer") {
    navigateTo("/login")
  }
  return (
    <div className='job_post page'>
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input type="text" placeholder='Job Title' value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
            <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Other">Other</option>
            </select>     
         </div>
          <div className="wrapper">        
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
          </div>
          <input type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location" />
              <div className="salary_wrapper">
              <div className="ranged_salary">
                  <input
                      type="number"
                      placeholder="Salary From"
                      value={Salaryfrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                  />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={Salaryto}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
              </div>
              <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />     
            <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  )
}

export default PostJob
