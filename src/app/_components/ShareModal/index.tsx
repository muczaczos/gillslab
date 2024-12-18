import React, { useState } from 'react'
import { IoShareOutline } from 'react-icons/io5'
import Link from 'next/link'

const ShareModal = ({ color, mdsize, lgsize }) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentURL = typeof window !== 'undefined' ? window.location.href : '' // Aktualny URL strony

  const toggleModal = () => setIsOpen(!isOpen)
  return (
    <div>
      {/* Ikona udostępniania */}
      <div onClick={toggleModal} className="">
        <IoShareOutline className={`text-3xl text-${color} md:text-${mdsize} lg:text-${lgsize}`} />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Udostępnij tę stronę</h2>
            <div className="flex flex-col space-y-3">
              {/* Facebook */}
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentURL,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:underline"
              >
                <span>📘</span> <span>Facebook</span>
              </Link>

              {/* WhatsApp */}
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentURL)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 hover:underline"
              >
                <span>📱</span> <span>WhatsApp</span>
              </Link>

              {/* Twitter */}
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:underline"
              >
                <span>🐦</span> <span>Twitter</span>
              </Link>

              {/* SMS */}
              <Link
                href={`sms:?&body=${encodeURIComponent(currentURL)}`}
                target="_self"
                className="flex items-center space-x-2 text-gray-600 hover:underline"
              >
                <span>📩</span> <span>SMS</span>
              </Link>
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareModal
