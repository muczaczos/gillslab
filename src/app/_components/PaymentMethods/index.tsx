import React from 'react'
import { BsBank, BsCreditCard2Back, BsCurrencyBitcoin } from 'react-icons/bs'
import Image from 'next/image'

import { RadioButton } from '../Radio'

import classes from './index.module.scss'

const PaymentMethods = ({ method, setMethod }) => {
  const handlePaymentMethod = (value: string) => {
    setMethod(value)
  }

  return (
    <div className={classes.paymentSection}>
      <h3 className={classes.payment}>Payment Methods</h3>
      {/* <div className={classes.radioAndIcon}>
        <RadioButton
          label="Payment Gateway"
          value="gateway"
          isSelected={method === 'gateway'}
          onRadioChange={handlePaymentMethod}
          groupName="method"
        />
        <Image
          alt="Rovolut bank logo"
          src="/media/revolut.svg"
          height="20"
          width="80"
          className="w-50"
        />
      </div> */}
      <div className={classes.radioAndIcon}>
        <RadioButton
          label="Trafser to: "
          value="revolut"
          isSelected={method === 'revolut'}
          onRadioChange={handlePaymentMethod}
          groupName="method"
        />
        <Image
          alt="Rovolut bank logo"
          src="/media/revolut.svg"
          height="20"
          width="80"
          className="w-50"
        />
      </div>
      <hr className="mb-5 mt-5"></hr>
      <div className={classes.radioAndIcon}>
        <RadioButton
          label="Trafser to: "
          value="wise"
          isSelected={method === 'wise'}
          onRadioChange={handlePaymentMethod}
          groupName="method"
        />
        <Image alt="Wise bank logo" src="/media/vise.svg" height="40" width="80" className="w-50" />
      </div>
      <hr className="mb-5 mt-5"></hr>
      <div className={classes.radioAndIcon}>
        <RadioButton
          label="SEPA transfer or others"
          value="sepa"
          isSelected={method === 'sepa'}
          onRadioChange={handlePaymentMethod}
          groupName="method"
        />
        <BsBank className={classes.icon} />
      </div>
      <hr className="mb-5 mt-5"></hr>
      <div className="flex justify-between">
        <RadioButton
          label="Cryptocurency"
          value="crypto"
          isSelected={method === 'crypto'}
          onRadioChange={handlePaymentMethod}
          groupName="method"
        />
        <div className="flex gap-2">
          <Image alt="logo" src="/media/btc-logo.svg" height="40" width="40" className="w-50" />
          <Image alt="ETH logo" src="/media/eth.svg" height="30" width="25" className="w-50" />
        </div>
      </div>
      <hr className="mb-5 mt-5"></hr>
    </div>
  )
}

export default PaymentMethods
