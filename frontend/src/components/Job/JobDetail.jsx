import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {getAllJobs,createJob,getMyJobs,updateJob,deleteJob,jobDetail} from '../../api/job'
function JobDetail() {
const { id } = useParams();
const [job, setJob] = useState({});
const navigateTo = useNavigate();

const { isAuthorized, user } = useContext(Context);

useEffect(() => {
  // axios.get(`http://localhost:4000/api/v1/job/getJob/${id}`, { 
  //     withCredentials: true,
  //   })
     jobDetail(id)
    .then((res) => {
      console.log(res.data.job);
      setJob(res.data.job);
    })
    .catch((error) => {
      navigateTo("/notfound");
    });
}, []);

if (!isAuthorized) {
  navigateTo("/login");
}
  return (
    // <h1>dfghjkl</h1>
    <section className="jobDetail page">
    <div className="container">
      <h3>Job Details</h3>
      <div className="banner">
        <p>
          Title: <span> {job.title}</span>
        </p>
        <p>
          Category: <span>{job.category}</span>
        </p>
        <p>
          City: <span>{job.city}</span>
        </p>
        <p>
          Location: <span>{job.location}</span>
        </p>
        <p>
          Description: <span>{job.description}</span>
        </p>
        <p>
          Job Posted On: <span>{job.jobPostedOn}</span>
        </p>
        <p>
          Salary :  
          <span>{job.Salaryto}</span> -    <span>{job.Salaryfrom}</span>
        </p>
        {user && user.role === "Employer" ? (
          <></>
        ) : (
          <Link to={`/application/${job._id}`}>Apply Now</Link>
        )}
      </div>
    </div>
  </section>
  )
}
export default JobDetail;