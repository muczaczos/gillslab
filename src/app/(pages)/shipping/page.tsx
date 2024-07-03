import React from 'react'
import Image from 'next/image'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import ShippingTable from './ShippingTable'

import classes from './index.module.scss'

const Shipping = async () => {
  return (
    <Gutter>
      <div className={classes.imageTitle}>
        <Image
          alt="Shipping package with mushrooms growkit"
          src="/media/shipping.svg"
          height="400"
          width="400"
          className={classes.image}
        />
        <h2 className={classes.title}>
          Shipping is the most important thing in an online store. 🍄🎁🎁🎁🚐
        </h2>
      </div>
      <p className="sm:mt-0 lg:mt-10 mb-10 text-xl lg:text-2xl">
        We take care of your shipments from start to finish. We always send the tracking number
        after shipment. You can check shipping prices by zone on this page. If you don’t see your
        country on that list, please contact us.
      </p>
      <div className="flex justify-center mt-5">
        <Image width="300" height="100" alt="dpd logotype" src="/media/dpd.svg" />
      </div>
      <ShippingTable />
      <p className="mt-5 text-lg">
        <span className="font-bold">DPD</span> also adds special zones for these countries depending
        on your postcode. Shipping to these zones will be more expensive. Croatia, Denmark, Estonia,
        Finland, France, Greece, Spain, the Netherlands, Germany, Portugal, Sweden and Italy have
        special zones. Go to ‘Special Zone‘ page and check if your zip code is in these zones.
      </p>
      <div className="flex justify-center mt-5">
        <Button label="Special Zones" href="/special-zones" appearance="primary" />
      </div>
      <div className={classes.gap}></div>
      <HR />
      <div className="flex justify-center mt-10">
        <Image
          width="400"
          height="100"
          alt="Postal service logotype"
          src="/media/Poczta_Polska.svg"
        />
      </div>

      <table className="mt-5 border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 6</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">
                Egypt, Iran, Japan, Jordan, Lebanon, South Korea, Thailand, Bosnia and Herzegovina,
                Norway, Serbia, Switzerland, Turkey, United Kingdom, Canada, New Zeland, Uruguay
              </p>
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              0-1kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              38€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              1-3kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              42€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              3-10kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              52€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              10-20kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              58€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20-31.5kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              63€
            </td>
          </tr>
        </tbody>
      </table>
    </Gutter>
  )
}

export default Shipping
