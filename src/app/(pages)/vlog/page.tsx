import React from 'react'

import { Gutter } from '../../_components/Gutter'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'

const Vlog = async () => {
  return (
    <LayoutWithHeaderFooter>
      <Gutter className="pb-32">
        <h1>Vlog</h1>
      </Gutter>
    </LayoutWithHeaderFooter>
  )
}

export default Vlog
