import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'
function HowItWork() {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How Jobzee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus quidem natus libero quibusdam obcaecati quaerat eveniet commodi accusantium placeat ab animi repellat, et, ipsa molestiae nulla hic, aperiam vitae.</p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus quidem natus libero quibusdam obcaecati quaerat eveniet commodi accusantium placeat ab animi repellat, et, ipsa molestiae nulla hic, aperiam vitae.</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus quidem natus libero quibusdam obcaecati quaerat eveniet commodi accusantium placeat ab animi repellat, et, ipsa molestiae nulla hic, aperiam vitae.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWork
