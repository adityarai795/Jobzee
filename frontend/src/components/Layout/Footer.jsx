import React from 'react'
import { Context }  from '../../main';
import { Link } from 'react-router-dom';
import {FaFacebook,FaYoutube,FaLinkedin} from 'react-icons/fa';
import {RiInstagramFill} from 'react-icons/ri';
function Footer() {
  const {isAuthorized}=React.useContext(Context);
  return (
    <footer className={isAuthorized ?"footerShow":"footerHide"}>
      <div>
        &copy; All Rights Reserved by AdityaJob
      </div>
      <div>
        <Link to={"/"} target='_blank'>Home</Link>
        <Link to={"/"} target='_blank'>Home</Link> 
        <Link to={"/"} target='_blank'>Home</Link>
        <Link to={"/"} target='_blank'>Home</Link>
        <Link to={"/"} target='_blank'>Home</Link>
      </div>
    </footer>
  )
}

export default Footer
