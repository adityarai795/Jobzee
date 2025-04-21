// src/api/job.js
import API from './api';

export const createJob = (jobData) => API.post('/job/post', jobData);

export const getAllJobs = () => API.get('/job/getJobs');

export const jobDetail=(id)=>API.get(`job/getJob/${id}`)
export const getMyJobs = () => API.get('/job/getmyJobs');

export const updateJob = (jobId, updatedJob) => API.put(`/job/updateJob/${jobId}`, updatedJob);

export const deleteJob = (jobId) => API.delete(`job/deleteJob/${jobId}`);
