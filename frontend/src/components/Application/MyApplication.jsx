import React, { use, useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {deleteApplications,getAllApplicationsEmployer,getAllApplicationsJobSeeker,submitApplication} from "../../api/application";

function MyApplication() {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized ,user} = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if(user && user.role === "Employer"){
        console.log(user);
        // axios.get("http://localhost:4000/api/v1/application/employer/getall",{withCredentials: true})
        getAllApplicationsEmployer()
        .then((response) => {  
          console.log(response.data.applications);
          setApplications(response.data.applications);
        }).catch((error) => {
          toast.error(error.response.data.message);
        });
      }else{ 
        // axios.get("http://localhost:4000/api/v1/application/jobseeker/getall",{withCredentials: true})
         getAllApplicationsJobSeeker()
        .then((response) => {
          setApplications(response.data.applications);
        }).catch((error) => {
          toast.error(error.response.data.message);
        });

      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized])

  if(!isAuthorized) {
    navigateTo("/login");
  }
  const deleteApplication = (id) => {
    try {
      // axios
      //   .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
      //     withCredentials: true,
      //   })/
      const jobId = id;
        deleteApplications(jobId)
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <section className="application">
      {user && user.role ==='Job Seeker' ? (
        <div className="container">
          <h1>My Application</h1>
          {applications.length <=0 ? (
            <>
              <h4>No applications found.</h4>
            </>
          ) : (
           applications.map((element)=>{
            return(
              <JobSeekerCard 
              element={element}
              key={element._id}
              deleteApplication={deleteApplication}
              setModalOpen={setModalOpen}
              />
            );
           })
          )}
        </div>
      ):(
        <div className="container">
        <h1>Applications From Job Seekers</h1>
        {applications.length <= 0 ? (
          <>
            <h4>No Applications Found</h4>
          </>
        ) : (
          applications.map((element) => {
            return (
              <EmployerCard
                element={element}
                key={element._id}
                
              />
            );
          })
        )}
      </div>  
      )}
    </section >
  )
}

export default MyApplication
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <hr />
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
       
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
    <hr />
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
 
      </div>
    </>
  );
};