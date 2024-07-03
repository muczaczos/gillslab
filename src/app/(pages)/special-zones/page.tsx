'use client'
import React, { useState } from 'react'

import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import {
  croatia,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  holand,
  italy,
} from './contryRanges'
import SpecialTable from './SpecialTable'

const SpecialZones = () => {
  return (
    <Gutter>
      <h1 className="text-center mt-10 mb-3">DPD Special Zones</h1>
      <p className="text-2xl text-center mb-10">🏴🏳‍🌈🎏🚩</p>

      <SpecialTable {...croatia} />
      <SpecialTable {...denmark} />
      <SpecialTable {...estonia} />
      <SpecialTable {...finland} />
      <SpecialTable {...france} />
      <SpecialTable {...germany} />
      <SpecialTable {...greece} />
      <SpecialTable {...holand} />
      <SpecialTable {...italy} />
    </Gutter>
  )
}

export default SpecialZones
