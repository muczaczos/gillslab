'use client'
import React from 'react'

import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
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
    <LayoutWithHeaderFooter>
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
    </LayoutWithHeaderFooter>
  )
}

export default SpecialZones
