import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryList from 'react-select-country-list'

import { Input } from '../Input'
import CountrySelector from './CountrySelector'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
}

const ShippingDetails = ({
  setFullName,
  setAddress,
  setCity,
  setPostalCode,
  setCountry,
  setPhone,
  setEmail,
  defaultFullName = '',
  defaultAddress = '',
  defaultCity = '',
  defaultPostalCode = '',
  defaultCountry = '',
  defaultPhone = '',
  defaultEmail = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const [fullName, setFullNameValue] = useState(defaultFullName)
  const [address, setAddressValue] = useState(defaultAddress)
  const [city, setCityValue] = useState(defaultCity)
  const [postalCode, setPostalCodeValue] = useState(defaultPostalCode)
  const [country, setCountryValue] = useState(defaultCountry)
  const [phone, setPhoneValue] = useState(defaultPhone)
  const [email, setEmailValue] = useState(defaultEmail)

  useEffect(() => {
    setCity(defaultCity)
    setFullName(defaultFullName)
    setAddress(defaultAddress)
    setPostalCode(defaultPostalCode)
    setCountry(defaultCountry)
    setPhone(defaultPhone)
    setEmail(defaultEmail)
  }, [
    defaultCity,
    defaultFullName,
    defaultAddress,
    defaultPostalCode,
    defaultCountry,
    defaultPhone,
    defaultEmail,
    setCity,
    setFullName,
    setAddress,
    setPostalCode,
    setCountry,
    setPhone,
    setEmail,
  ])

  const handleName = e => {
    setFullNameValue(e.target.value)
    setFullName(e.target.value)
  }

  const handleAddress = e => {
    setAddressValue(e.target.value)
    setAddress(e.target.value)
  }

  const handleCity = e => {
    setCityValue(e.target.value)
    setCity(e.target.value)
  }

  const handlePostalCode = e => {
    setPostalCodeValue(e.target.value)
    setPostalCode(e.target.value)
  }

  const handlePhone = e => {
    setPhoneValue(e.target.value)
    setPhone(e.target.value)
  }

  const handleEmail = e => {
    setEmailValue(e.target.value)
    setEmail(e.target.value)
  }

  return (
    <div className={classes.shippingSection}>
      <h3 className={classes.shipping}>Shipping Details</h3>
      <div className={classes.forms}>
        <div className={classes.fullName}>
          <Input
            name="fullname"
            type="text"
            label="Full Name"
            register={register}
            error={null}
            disabled={false}
            value={fullName}
            onChange={handleName}
          />
        </div>
        <div className={classes.address}>
          <Input
            name="address"
            type="text"
            label="Street Address"
            register={register}
            error={null}
            value={address}
            onChange={handleAddress}
          />
        </div>
        <div className={classes.city}>
          <Input
            name="city"
            type="text"
            label="City"
            register={register}
            error={null}
            value={city}
            onChange={handleCity}
          />
        </div>
        <div className={classes.postalCode}>
          <Input
            name="postalcode"
            type="text"
            label="Postal Code"
            register={register}
            error={null}
            value={postalCode}
            onChange={handlePostalCode}
          />
        </div>
        <div className={classes.country}>
          <p className={classes.countryLabel}>Country</p>
          <CountrySelector setCountry={setCountry} />
        </div>
        <div className={classes.phone}>
          <Input
            name="phone"
            type="text"
            label="Phone Number"
            register={register}
            error={null}
            value={phone}
            onChange={handlePhone}
          />
        </div>
        <div className={classes.email}>
          <Input
            name="email"
            type="email"
            label="Email"
            register={register}
            error={null}
            value={email}
            onChange={handleEmail}
          />
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
