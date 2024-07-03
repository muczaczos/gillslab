'use client'
import React from 'react'

const Message = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center bg-white w-52 h-52 p-4 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <p className="text-center text-lg text-gray-800">{message}</p>
      </div>
    </div>
  )
}

export default Message
