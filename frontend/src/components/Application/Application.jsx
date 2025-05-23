import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import {deleteApplications,getAllApplicationsEmployer,getAllApplicationsJobSeeker,submitApplication} from "../../api/application";

function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("jobId", id);

    try {
      // const { data } = await axios.post(
      //   "http://localhost:4000/api/v1/application/post",
      //   formData,
      //   {
      //     withCredentials: true,
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const {data}=await submitApplication(formData);
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      toast.success(data.message);
      navigateTo("/jobs/getJobs");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }
  return (
    <section className="application">
    <div className="container">
      <h3>Application Form</h3>
      <form onSubmit={handleApplication}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          placeholder="CoverLetter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
 
        <button type="submit">Send Application</button>
      </form>
    </div>
  </section>
  )
}

export default Application
