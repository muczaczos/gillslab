'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { Button } from '../../_components/Button'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

export const dynamic = 'force-dynamic'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errorNameMessage, setErrorNameMessage] = useState('')
  const [errorEmailMessage, setErrorEmailMessage] = useState('')
  const [errorMessageMessage, setErrorMessageMessage] = useState('')
  const [noErrorMessage, setNoErrorMessage] = useState('')

  const handleChange = event => {
    setMessage(event.target.value)
  }

  const handleMessageClick = async () => {
    setErrorEmailMessage('')
    setErrorMessageMessage('')
    setErrorNameMessage('')
    setNoErrorMessage('')

    if (name !== '') {
      if (email !== '') {
        if (message !== '') {
          const dataObj = { name, email, message }
          setNoErrorMessage('Your message has been sent')
          try {
            await axios.post('/send-email', dataObj)
          } catch (error) {
            // Error handling
          }
        } else {
          setErrorMessageMessage('Please fill the message field')
        }
      } else {
        setErrorEmailMessage('Please fill the email field')
      }
    } else {
      setErrorNameMessage('Please fill the name field')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const handleName = e => {
    setName(e.target.value)
  }

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <LayoutWithHeaderFooter>
      <div id="mail" className="rounded-xl shadow-xl bg-customWhite opacity-90 p-5">
        <div>
          <h3 className="mb-3 text-primary">Contact Us</h3>
          <div>
            <div className="relative mb-5">
              <input
                required
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                className="text-xl roundex-xl border-0 peer w-full h-10 bg-primary opacity-80 text-customWhite placeholder-transparent focus:border-secondary"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-0 text-customWhite pl-2 pt-2 text-sm transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0 peer-valid:opacity-0"
              >
                Name
              </label>
            </div>
            {errorNameMessage && <p className="text-red-600">{errorNameMessage}</p>}

            <div className="relative mb-5">
              <input
                required
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                className="text-xl peer w-full h-10 bg-primary opacity-80 text-customWhite placeholder-transparent focus:outline-none focus:border-secondary"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 text-customWhite pl-2 pt-2 text-sm transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0 peer-valid:opacity-0"
              >
                Email
              </label>
            </div>
            {errorEmailMessage && <p className="text-red-600">{errorEmailMessage}</p>}

            <div className="relative mb-5">
              <textarea
                required
                className="text-xl peer w-full bg-primary opacity-80 rows border-b-2 border-primary text-customWhite placeholder-transparent focus:outline-none focus-border-2 focus:border-secondary"
                onChange={handleChange}
                name="message"
                rows={5}
                cols={40}
                placeholder="Message"
              />
              <label
                htmlFor="message"
                className="absolute left-0 pl-2 pt-2 text-customWhite text-sm transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0 peer-valid:opacity-0"
              >
                Message
              </label>
            </div>

            {errorMessageMessage && <p className="text-red-600">{errorMessageMessage}</p>}
            {noErrorMessage && <p className="text-green-600">{noErrorMessage}</p>}
            <Button className="mt-5 mb-36 p-5 w-full bg-secondary" onClick={handleMessageClick}>
              <p className="text-white font-bold text-2xl">Send a message</p>
            </Button>
          </div>
        </div>
      </div>
    </LayoutWithHeaderFooter>
  )
}
