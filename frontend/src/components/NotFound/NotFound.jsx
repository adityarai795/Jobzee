import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <section className='page notfound'>
      <div className="content">
        <img src="/notfound.png" alt="notFound" />
        <Link to="/">Return to Home</Link>
      </div>
      
    </section>
  )
}

export default NotFound
