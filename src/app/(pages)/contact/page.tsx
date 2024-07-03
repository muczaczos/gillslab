'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import axios from 'axios'
import { Metadata } from 'next'
import Image from 'next/image'

import { Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { Input } from '../../_components/Input'
import RichText from '../../_components/RichText'
import { generateMeta } from '../../_utilities/generateMeta'

import classes from './index.module.scss'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
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
    // console.log(event.target.value)
    setMessage(event.target.value)
  }

  const handleWhatsAppClick = () => {
    // Twój numer telefonu WhatsApp
    const phoneNumber = '+48609164574'
    // Twój wiadomość, którą chcesz wysłać
    const message = 'Cześć! Jestem zainteresowany Twoją ofertą.'
    // Tworzymy link do WhatsApp z numerem telefonu i wiadomością
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    // Przekierowanie użytkownika do aplikacji WhatsApp
    window.location.href = whatsappUrl
  }

  const handleCallClick = () => {
    // Twój numer telefonu
    const phoneNumber = '+48691586665'
    // Tworzymy link do wybierania połączenia na telefonie
    const callUrl = `tel:${phoneNumber}`
    // Przekierowanie użytkownika do wybierania połączenia
    window.location.href = callUrl
  }

  const handleMessageClick = async () => {
    setErrorEmailMessage('')
    setErrorMessageMessage('')
    setErrorNameMessage('')
    setNoErrorMessage('')

    if (name != '') {
      if (email != '') {
        if (message != '') {
          let data = null
          data = JSON.stringify({
            name: name,
            email: email,
            message: message,
          })
          const dataObj = JSON.parse(data)
          setNoErrorMessage('Your message has been sent')
          try {
            const response = await axios.post('/send-email', dataObj)
            //  console.log(response.data)
          } catch (error) {
            //   console.error('Error:', error.message)
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
    <div className="relative">
      <div
        className="opacity-70 h-96 bg-cover md:hidden"
        style={{ backgroundImage: "url('/media/contact.jpg')" }}
      >
        {/* Tło */}
      </div>
      <div
        className="z-0 opacity-70 hidden md:block absolute top-0 left-0 w-1/2 h-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/media/contact.jpg')" }}
      >
        {/* Tło */}
      </div>
      <Gutter className="relative z-0">
        <div className="md:ml-24 lg:ml-48">
          <h1 className="mt-10 text-right">Contact us</h1>
          <h4 className="text-right">Planet-of-Mushrooms s.r.o</h4>
          <h4 className="text-right">Szkolna 1/3</h4>
          <h4 className="text-right">05-500 Piaseczno</h4>
          <h4 className="text-right">Poland</h4>

          <section className="flex flex-col lg:flex-row gap-5 mt-10 mb-16">
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-xl mb-5">
              <Image
                src="/media/Jan.svg"
                alt="James is avatar"
                width={200}
                height={200}
                className="opacity-70 mb-5"
              />
              <h3>James</h3>
              <h4>Cap Grower</h4>
              <h5 className="text-center">Contact via WhatsApp.</h5>
              <h6 className="text-center">7days / week (8am - 8pm) GMT+01:00</h6>
              <Button onClick={handleWhatsAppClick}>
                <Image
                  src="/media/WhatsApp.svg"
                  alt="Whatsapp logo"
                  width={150}
                  height={150}
                  className="opacity-70 mb-5"
                />
              </Button>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-xl mb-5">
              <Image
                src="/media/arek.svg"
                alt="Arek is avatar"
                width={200}
                height={200}
                className="opacity-70 mb-5"
              />
              <h3>Arek</h3>
              <h4>IT Technican</h4>
              <h5 className="text-center">Contact via Mobile</h5>
              <h6 className="text-center">Monday - Friday (4pm - 8pm) GMT+01:00</h6>
              <Button onClick={handleCallClick}>
                <Image
                  src="/media/mobile.svg"
                  alt="Telephone logo"
                  width={120}
                  height={120}
                  className="opacity-70 mb-5"
                />
              </Button>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-xl mb-5">
              <Image
                src="/media/Adiva.svg"
                alt="Adiva is avatar"
                width={200}
                height={200}
                className="opacity-70 mb-5"
              />
              <h3>Adiva</h3>
              <h4>Help Desk</h4>
              <h5 className="text-center">Contact via email</h5>
              <h6 className="text-center">7days / week (8am - 8pm) GMT+01:00</h6>
              <Button href="#mail">
                <Image
                  src="/media/envelope.svg"
                  alt="Envelope"
                  width={150}
                  height={150}
                  className="opacity-70 mb-5"
                />
              </Button>
            </div>
          </section>
        </div>
        <div id="mail" className="rounded-xl shadow-xl bg-gray-50 opacity-90 p-5">
          <div>
            <h3 className="mb-3">Contact Form</h3>
            <div>
              <Input
                required={true}
                name="name"
                type="text"
                label="Name"
                register={register}
                error={errors}
                disabled={false}
                value={name}
                onChange={handleName}
                className="mb-5 bg-white"
              />
              {errorNameMessage && <p className="text-red-600">{errorNameMessage}</p>}
              <Input
                required={true}
                name="email"
                type="email"
                label="Email"
                register={register}
                error={errors}
                value={email}
                onChange={handleEmail}
                className="bg-white"
              />
              {errorEmailMessage && <p className="text-red-600">{errorEmailMessage}</p>}
              <p className="mt-3 mb-2">Message</p>
              <textarea
                required={true}
                className="w-full rounded-xl"
                onChange={handleChange}
                name="message"
                rows={15}
                cols={40}
              />
              {errorMessageMessage && <p className="text-red-600">{errorMessageMessage}</p>}
              {noErrorMessage && <p className="text-green-600">{noErrorMessage}</p>}
              <Button className="mt-5 p-5 w-full bg-black" onClick={handleMessageClick}>
                <p className="text-white text-2xl">Send a message</p>
              </Button>
            </div>
          </div>
        </div>
      </Gutter>
    </div>
  )
}
