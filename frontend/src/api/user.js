import API from "./api";  

export const loginUser = (credentials) => API.post("/user/login", credentials);
export const registerUser = (userData) => API.post("/user/register", userData);
export const logoutUser = () => API.get("/user/logout");
