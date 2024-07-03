'use client'
import React from 'react'

const ShippingTable = () => {
  return (
    <div className="pt-10">
      <table className="border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 1</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">Czech Republic, Germany, Hungary, Latvia, Lithuania, Slovakia</p>
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              0-1kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              14€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              1-3kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              18€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              3-10kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              33€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              10-20kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              37€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20-31.5kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              41€
            </td>
          </tr>
        </tbody>
      </table>

      <table className="mt-10 border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 2</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">Austria, Belgium, Estonia, Luxembourg, Netherlands, Slovenia</p>
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              0-1kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              16€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              1-3kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              3-10kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              35€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              10-20kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              39€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20-31.5kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              43€
            </td>
          </tr>
        </tbody>
      </table>

      <table className="mt-10 border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 3</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">Bulgaria, Denmark, France, Romania</p>
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              0-1kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              24€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              1-3kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              29€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              3-10kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              37€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              10-20kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              41€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20-31.5kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              45€
            </td>
          </tr>
        </tbody>
      </table>

      <table className="mt-10 border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 4</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">Croatia, Finland, Ireland, Portugal, Spain, Sweden</p>
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              0-1kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              35€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              1-3kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              39€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              3-10kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              48€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              10-20kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              55€
            </td>
          </tr>
          <tr>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              20-31.5kg
            </td>
            <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
              60€
            </td>
          </tr>
        </tbody>
      </table>

      <table className="mt-10 border-collapse w-full">
        <thead>
          <tr className="border-solid border-1 border-gray-400">
            <th className="p-2">Zone 5</th>
            <th className="p-2 text-right">Weight Range</th>
            <th className="p-2 text-right">Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1/2 border-l-0 border-solid border-1 border-gray-400" rowSpan={5}>
              <p className="">Greece</p>
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
    </div>
  )
}

export default ShippingTable
