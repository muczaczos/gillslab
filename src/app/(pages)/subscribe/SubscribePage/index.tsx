'use client'

import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'

export const SubscribePage: React.FC<{}> = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setCustomerEmail] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    setIsButtonActive(!isButtonActive) // Button becomes active when the checkbox is checked
  }

  const handleSubscriber = async () => {
    if (firstName != '') {
      setMessage('')

      router.push(`/subscribe-confirmation?firstName=${firstName}&email=${email}`)
    } else {
      setMessage('Please enter your name into the form.')
    }
  }

  const { register } = useForm<FormData>()

  const handelFirstName = e => {
    setFirstName(e.target.value)
  }

  const handleCustomerEmail = e => {
    setCustomerEmail(e.target.value)
  }

  return (
    <Fragment>
      <h1 className="mb-5 text-primary text-4xl md:text-3xl">Subscribe to our newsletter!</h1>
      <p className="text-xl text-customGray-dark font-medium md:text-lg">
        By providing your email address {email}, you agree to receive periodic updates, promotions,
        and information related to mushroom cultivation, spore microscopy, and exclusive offers.
        Your email address will only be used for the purpose of sending our newsletter and will not
        be shared with any third parties. You can unsubscribe at any time. For more information,
        please refer to our Privacy Policy.
      </p>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />I want to
        subscribe to the newsletter and I agree to the privacy policy of planet-of-mushrooms.com.
      </label>
      <div className={`${isButtonActive ? 'opacity-100' : 'opacity-50'}`}>
        <div className="mt-5">
          <Input
            disabled={!isButtonActive}
            name="firstName"
            type="text"
            label="Name"
            error={null}
            register={register}
            value={firstName}
            onChange={handelFirstName}
            required={true}
          />
          {message && <p className="text-red-600">{message}</p>}
        </div>
        <div className="mt-5">
          <Input
            disabled={!isButtonActive}
            name="customerEmail"
            type="email"
            label="Email"
            register={register}
            error={null}
            value={email}
            onChange={handleCustomerEmail}
          />
        </div>
        <div className="flex justify-end mt-10">
          <Button
            disabled={!isButtonActive}
            label="Subscribe"
            onClick={handleSubscriber}
            className="bg-primary text-customWhite"
          ></Button>
        </div>
      </div>
    </Fragment>
  )
}
