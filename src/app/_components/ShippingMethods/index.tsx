'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import { HR } from '../HR'
import { InpostGeoWidget } from '../InpostGeoWidget'

import classes from './index.module.scss'

const ShippingMethods = ({ setLockerCode, setShowDisplayCode, setShippingMethods }) => {
  const [selectedCourier, setSelectedCourier] = useState('')
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  const handleCourierChange = event => {
    setSelectedCourier(event.target.value)
    setShippingMethods(event.target.value)
    setShowAdditionalInfo(event.target.value === 'paczkomat')
  }

  const afterPointSelected = point => {
    //alert('Selected point: ' + point.name)
    setLockerCode(point.name)
    setShowDisplayCode(true)
  }

  return (
    <div className={classes.sections}>
      <div className={classes.methodsSection}>
        <h3 className={classes.title}>Shipping Methods</h3>

        <label className={classes.radioWrapper}>
          <input
            type="radio"
            value="kurier-dpd"
            checked={selectedCourier === 'kurier-dpd'}
            onChange={handleCourierChange}
            className={classes.radio}
          />
          <div className={classes.labelAndLogo}>
            Kurier DPD
            <Image
              src="/../../../../../../media/dpd.png"
              width={100}
              height={100}
              alt="Logo firmy DHL"
            />
          </div>
        </label>
        <hr className={classes.hr}></hr>
        <label className={classes.radioWrapper}>
          <input
            type="radio"
            value="kurier-dhl"
            checked={selectedCourier === 'kurier-dhl'}
            onChange={handleCourierChange}
            className={classes.radio}
          />
          <div className={classes.labelAndLogo}>
            Kurier DHL
            <Image
              src="/../../../../../../media/dhl.jpg"
              width={100}
              height={100}
              alt="Logo firmy DHL"
            />
          </div>
        </label>
        <hr className={classes.hr}></hr>

        <label className={classes.radioWrapper}>
          <input
            type="radio"
            value="kurier-inpost"
            checked={selectedCourier === 'kurier-inpost'}
            onChange={handleCourierChange}
            className={classes.radio}
          />
          <div className={classes.labelAndLogo}>
            Kurier Inpost
            <Image
              src="/../../../../../../media/inpost.png"
              width={100}
              height={100}
              alt="Logo firmy DHL"
            />
          </div>
        </label>
        <hr className={classes.hr}></hr>
        <label className={classes.radioWrapper}>
          <input
            type="radio"
            value="paczkomat"
            checked={selectedCourier === 'paczkomat'}
            onChange={handleCourierChange}
            className={classes.radio}
          />
          <div className={classes.labelAndLogo}>
            Paczkomat Inpostu
            <Image
              src="/../../../../../../media/paczkomat.png"
              width={100}
              height={100}
              alt="Logo firmy DHL"
            />
          </div>
        </label>
        <hr className={classes.hr}></hr>
      </div>

      {showAdditionalInfo && (
        <div className={classes.bannerSection}>
          <div className={classes.geowidget}>
            <InpostGeoWidget
              token={
                'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMjU0NDA3MTksImlhdCI6MTcxMDA4MDcxOSwianRpIjoiYTY3OTBmYjgtMWE2YS00OWFhLTkzZmYtNjgyZjA1ZjEyMTUyIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTo3T3RpT1BtazhKOTNPYmlSeEtELXg1RkNNbnNMTmVMUS1fVkRjZDNLMlFvIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZTZmNjBhNDktYWE1OS00YzYyLTkyNmQtMmQzMjI0MzY0MWUzIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImU2ZjYwYTQ5LWFhNTktNGM2Mi05MjZkLTJkMzIyNDM2NDFlMyIsImFsbG93ZWRfcmVmZXJyZXJzIjoibXJncm93a2l0LmNvbSIsInV1aWQiOiJiNDlhMGI5NC0zM2M2LTQ0ZDctOTAzMy0zMjRkMzk2ZGE1ODUifQ.DsTR0TPrm_FxCSPOv6kCf4pfzzHAFUQHT4RxXxz7QjYYW3F0ACLruybtTsPH1yrHJfFjgX7ebPcdhpj8AUNJTqz0jYnx7qsnUjfoyjO2kUQpHUHymVR9tY29fKl4hjE0IvTGnf6GF0jJUTbfYF2cK3gWDYjHeb17sbLGoTvv8YdPMjZpyPcTWnTzgzKvLOtwaC_PJKfexnolaEKMui2vS876_EaC9C9wSBIgSmc_TIMWJC2o0aG1XG4gulzVRyH41-KDvhHXz1OMMaZsjGuwvrVupPZ5hr5we_CUKC_fAIsMSL9YkvUSzCO6j41FGpFCc5FrBVdg1RiIHoz2cH1iIw'
              }
              language="pl"
              config="parcelcollect"
              onPoint={afterPointSelected}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShippingMethods
