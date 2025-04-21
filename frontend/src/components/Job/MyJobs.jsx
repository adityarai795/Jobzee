import React from 'react'
import axios from "axios";
import  {  useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import {getAllJobs,createJob,getMyJobs,updateJob,deleteJob,jobDetail} from '../../api/job'




function MyJobs() {
    const [myjobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null)
  const {isAuthorized, user} = useContext(Context);
  const navigateTo = useNavigate();


  //fetching all jobs of An Emplyer
  useEffect(() => {
    if(!isAuthorized || user && user.role !== "Employer") {
      navigateTo("/")
    }
    const fetchJobs=async()=>{
      try {
        const {data}=await getMyJobs()
        // const {data}=await axios.get("http://localhost:4000/api/v1/job/getmyJobs", {withCredentials:true})
        setMyJobs(data.jobs);

        console.log("this is data.myJobs",data.jobs)
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
      
    }
    console.log("User:", user);
    console.log("Authorized:", isAuthorized);
    
    fetchJobs();

  }, [])

  // for handle editing mode
  // function to handle editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  
  // disabling mode
  const  handleDisableEdit = () => {
    setEditingMode(null);
  }
  // function for editing job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myjobs.find(job => job._id === jobId);
    await updateJob(jobId, updatedJob)
    // await axios.put(`http://localhost:4000/api/v1/job/updateJob/${jobId}`, updatedJob, {withCredentials:true, headers:{"Content-Type":"application/json"}})
    .then((res) => {
      toast.success(res.data.message);
      setEditingMode(null);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  // function for deleting job
  const handleDeleteJob = async (jobId) => {

    // await axios.delete(`http://localhost:4000/api/v1/job/deleteJob/${jobId}`, {withCredentials:true, headers:{"Content-Type":"application/json"}})
    await deleteJob(jobId)
    .then((res) => {
      toast.success(res.data.message);
      setMyJobs(myjobs.filter(job => job._id !== jobId));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  };
  const handleInputChange=(jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  }

  return (

      <>
        <div className="myJobs page">
          <div className="container">
            <h1>Your Posted Jobs</h1>
            {myjobs.length > 0 ? (
              <>
                <div className="banner">
                  {myjobs.map((element) => (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                         
                          <div>
                            <span>City:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Category:</span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN STACK Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>
                          <div>
                            <span>
                              Salary:{" "}
                               
                                <div>
                                  <input
                                    type="number"
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                    value={element.Salaryfrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "Salaryfrom",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    type="number"
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                    value={element.Salaryto}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "Salaryto",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              
                            </span>
                          </div>
                          <div>
                            {" "}
                            <span>Expired:</span>
                            <select
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value={true}>TRUE</option>
                              <option value={false}>FALSE</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description:</span>{" "}
                            <textarea
                              rows={5}
                              value={element.description}
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Location: </span>
                            <textarea
                              value={element.location}
                              rows={5}
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* Out Of Content Class */}
                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editingMode === element._id ? (
                            <>
                              <button
                                onClick={() => handleUpdateJob(element._id)}
                                className="check_btn"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleDisableEdit()}
                                className="cross_btn"
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEnableEdit(element._id)}
                              className="edit_btn"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteJob(element._id)}
                          className="delete_btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>
                You've not posted any job or may be you deleted all of your jobs!
              </p>
            )}
          </div>
        </div>
       </>
          )
}





export default MyJobs
