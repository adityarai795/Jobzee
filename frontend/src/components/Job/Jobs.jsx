import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {getAllJobs,createJob,getMyJobs,updateJob,deleteJob,jobDetail} from '../../api/job'

function Jobs() {
  const [jobs, setJobs] = React.useState([]);
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();
  useEffect(() => {
   try {
    // axios.get("http://localhost:4000/api/v1/job/getJobs",{withCredentials:true})
    getAllJobs()
      .then(response => {
        setJobs(response.data);
        console.log("Jobs fetched successfully:");
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
      });
   } catch (error) {
      console.log(error)
   }
  }, []);
  if(!isAuthorized) {
    navigateTo("/login")
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/jobs/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  )
}


export default Jobs ;
