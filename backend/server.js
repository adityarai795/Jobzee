import app from './app.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.cloudinafy_name,
  api_key: process.env.cloudinafy_key,
  api_secret: process.env.cloudinafy_secret,


})

const port=process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});