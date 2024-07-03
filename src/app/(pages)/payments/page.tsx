import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'

const Payments = async () => {
  return (
    <Gutter>
      <div className="gap-5 mt-5 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center">
        <h2 className="mb-5 lg:mb-0">
          Simplify your online shopping experience with our secure payment options. 🏦 💴 🏧
        </h2>
        <Image
          alt="Image with black credit card"
          src="/media/payment.jpg"
          height="300"
          width="300"
          className="mb-5 mx-auto"
        />
      </div>
      <p className="sm:mt-0 mb-10 lg:mt-10 text-2xl lg:text-2xl">
        Experience hassle-free shopping with our online store's variety of secure payment methods,
        designed to make your checkout process smooth and worry-free. Join our satisfied customers
        who enjoy seamless transactions and peace of mind with our trusted payment solutions.
      </p>

      <div className="mb-5 bg-current: bg-blue-100 border-solid border-1 border-blue-300">
        <Link
          href="https://www.revolut.com/"
          className=" gap-5 mt-5 mb-10 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
        >
          <Image
            alt="Rovolut bank logo"
            src="/media/revolut.svg"
            height="300"
            width="200"
            className="w-50 lg:pl-10 xs:pl-0 mx-auto"
          />
          <p className="pl-5 pr-5 pb-5 lg:pb-0 lg:pt-5 text-xl">
            Discover the power of Revolut for effortless shopping at our store. With lightning-fast
            transactions and enhanced security features, your purchases are worry-free. Say goodbye
            to traditional banking constraints and hello to a world of convenience. If you open a
            free Revolut account, you'll be able to make lightning-fast transfers to us. You can
            also initiate a SEPA transfer to our Revolut from any account and in any currency.
          </p>
        </Link>
      </div>

      <div className="bg-current: bg-green-100 border-solid border-1 border-green-300">
        <Link
          href="https://wise.com/"
          className="mb-5 gap-5 mt-2 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
        >
          <Image
            alt="Shipping package with mushrooms growkit"
            src="/media/vise.svg"
            height="300"
            width="200"
            className="lg:pl-5 xs:pl-0 w-50 mb-5 mx-auto pt-10 pb-5"
          />
          <p className="mb-5 pl-5 pr-5 lg:mb-0 text-xl">
            Experience the convenience of Visa Bank for seamless shopping at our store. With rapid
            transactions and advanced security measures, your purchases are effortlessly smooth. Bid
            farewell to conventional banking limitations and embrace a realm of ease. Upon opening a
            free Visa Bank account, you'll gain the capability to swiftly transfer funds to us.
            Additionally, you can execute SEPA transfers to our Visa Bank account from any source
            and in any currency.
          </p>
        </Link>
      </div>

      <div className="mt-5 bg-current: bg-yellow-100 border-solid border-1 border-yellow-300">
        <Link
          href="https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html"
          className="gap-5 mt-5 lg:flex lg:flex-row lg:items-center md:flex xs:flex-col items-center"
        >
          <Image
            alt="Logo of the SEPA payment"
            src="/media/sepa.svg"
            height="300"
            width="200"
            className="lg:pl-10 xs:pl-5 mt-5 w-50 mb-5 mx-auto"
          />
          <p className="pl-5 pr-5 mb-5 text-xl">
            Explore the efficiency of SEPA transfers for seamless transactions at our store. With
            swift processing times and robust security protocols, your payments are handled with
            ease. Say goodbye to lengthy waiting periods and embrace the speed of SEPA transfers.
            Whether you're sending funds domestically or across borders within the SEPA zone, enjoy
            the convenience and reliability of this streamlined payment method. Join the countless
            satisfied customers who trust SEPA transfers for their financial transactions, and
            experience hassle-free payments today.
          </p>
        </Link>
      </div>

      <div className="mt-5 bg-current: bg-orange-100 border-solid border-1 border-orange-300">
        <Link
          href="https://bitcoin.org/en/getting-started"
          className="mt-5 lg:flex lg:flex-row lg:items-center xs:flex-col sm:flex sm:items-center"
        >
          <Image
            alt="Logo of the Bitcoin cryptocurency"
            src="/media/bitcoin.png"
            height="300"
            width="200"
            className="flex mt-7 mb-7 mx-auto lg:ml-5"
          />
          <p className="xs:pb-0 lg:pb-5 ml-5 md:ml-9 lg:ml-6 mr-5 mb-5 lg:mb-0 text-xl">
            Unleash the potential of Bitcoin and Ethereum for seamless transactions at our store.
            With decentralized networks and innovative blockchain technology, your payments are
            secure and swift. Say goodbye to conventional currency constraints and embrace the
            versatility of cryptocurrencies. Whether you opt for Bitcoin or Ethereum, enjoy the
            speed and convenience of digital currency transactions. Join the expanding realm of
            cryptocurrency users and redefine your shopping experience today.
          </p>
        </Link>
      </div>
    </Gutter>
  )
}

export default Payments
