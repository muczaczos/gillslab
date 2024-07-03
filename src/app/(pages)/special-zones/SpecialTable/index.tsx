import React, { useState } from 'react'

import '/node_modules/flag-icons/css/flag-icons.min.css'

const SpecialTable = ({ country, codes, ranges, weights, countryCode }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleExpand}
          className="border text-lg border-solid w-full rounded-md mb-2 py-2 px-4 bg-gray-200"
        >
          Click to show {country} Codes <span className={'fi fi-' + countryCode}></span>
        </button>
      </div>
      {isExpanded && (
        <table className="mb-2 border-collapse w-full">
          <thead>
            <tr className="border-solid border-1 border-gray-400">
              <th className="p-2">{country}</th>
              <th className="p-2 text-right">Weight Range</th>
              <th className="p-2 text-right">Shipping Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="w-1/2 border-l-0 border-solid border-1 border-gray-400"
                rowSpan={weights.length}
              >
                <p className="text-lg">{codes}</p>
              </td>
              <td className="text-lg border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
                {weights[0]}kg
              </td>
              <td className="text-lg border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
                {ranges[0]}€
              </td>
            </tr>
            {weights.slice(1).map((weight, index) => (
              <tr key={index + 1}>
                <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
                  {weight}kg
                </td>
                <td className="border-l-0 border-r-0 border-solid border-gray-400 text-right p-2">
                  {ranges[index + 1]}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default SpecialTable
