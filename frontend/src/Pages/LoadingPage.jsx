import React from 'react'
import { Link } from 'react-router-dom'

const LoadingPage = () => {
  return (
    <div>
      <div className="card rounded-[12px] m-10 text-xl shadow-2xl p-5 animate-pulse">
        <Link >
            <div className="w-full h-64 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-1 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </Link> 
        </div>
    </div>
  )
}

export default LoadingPage
