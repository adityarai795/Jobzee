import API from "./api";

export const submitApplication = (applicationData) =>
  API.post("/application/post", applicationData);

export const getAllApplicationsJobSeeker = () =>
  API.get("/application/jobseeker/getall");

export const getAllApplicationsEmployer = () =>
  API.get("/application/employer/getall");

export const deleteApplications = (applicationId) =>
  API.delete(`/application/delete/${applicationId}`);
