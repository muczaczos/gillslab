import React from 'react'

import { Zone } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'

let zones: Zone[] | null = null

function removeDash(code) {
  return code.replace('-', '')
}

export async function calculateShippingCost(postalCode, weight, countryCode) {
  let data = []
  zones = await fetchDocs<Zone>('zones')
  data = zones
  if (countryCode) {
    countryCode = removeDash(countryCode)
  }
  // Iterating through each object in the data array
  for (const zone of data) {
    // Checking if the countryCode is in the selectedCountries array

    if (zone.selectedCountries.includes(countryCode)) {
      // Checking if the postalCode matches any code in the codes array
      for (const codeObj of zone.codes) {
        // Split the codes by comma and trim whitespace
        const codesArray = codeObj.code.split(',').map(code => code.trim())
        if (codesArray.includes(postalCode)) {
          // Checking if weight is within the range and finding the appropriate price
          for (const range of zone.ranges) {
            const rangeWeight = parseFloat(range.weigth)
            if (
              (weight <= 1 && rangeWeight === 1) ||
              (weight > 1 && weight <= 2 && rangeWeight === 2) ||
              (weight > 2 && weight <= 5 && rangeWeight === 5) ||
              (weight > 5 && weight <= 15 && rangeWeight === 15) ||
              (weight > 15 && weight <= 30 && rangeWeight === 30)
            ) {
              return range.price
            }
          }
        }
      }

      // Checking if the postalCode falls within any codesRanges
      for (const rangeObj of zone.codesRanges) {
        const from = parseInt(rangeObj.from)
        const to = parseInt(rangeObj.to)
        const code = parseInt(postalCode)
        if (code >= from && code <= to) {
          // Finding the appropriate price for the weight
          for (const range of zone.ranges) {
            const rangeWeight = parseFloat(range.weigth)
            if (
              (weight <= 1 && rangeWeight === 1) ||
              (weight > 1 && weight <= 2 && rangeWeight === 2) ||
              (weight > 2 && weight <= 5 && rangeWeight === 5) ||
              (weight > 5 && weight <= 15 && rangeWeight === 15) ||
              (weight > 15 && weight <= 30 && rangeWeight === 30)
            ) {
              return range.price
            }
          }
        }
      }

      // If codes is not in 'special zones'
      if (zone.codes.length == 0 && zone.codesRanges.length == 0) {
        // Checking if weight is within the range and finding the appropriate price
        for (const range of zone.ranges) {
          const rangeWeight = parseFloat(range.weigth)
          if (
            (weight <= 1 && rangeWeight === 1) ||
            (weight > 1 && weight <= 2 && rangeWeight === 2) ||
            (weight > 2 && weight <= 5 && rangeWeight === 5) ||
            (weight > 5 && weight <= 15 && rangeWeight === 15) ||
            (weight > 15 && weight <= 30 && rangeWeight === 30)
          ) {
            return range.price
          }
        }
      }
    }
  }

  // If no matching zone found, return null
  return '1000 Your country is not in our system. Please contact us to calculate the shipping cost.'
}
