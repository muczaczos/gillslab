import React from 'react'

import { Gutter } from '../../../_components/Gutter'
import SmallCarousel from '../../../_components/SmallCarousel'

const MobileCarousel = () => {
  const links = [
    'shop/cubensis-grow-kits',
    'shop/cubensis-spore-syringes',
    'shop/cubensis-liquid-cultures',
    'shop/laboratory-equipments',
    'shop/substrates',
  ]

  const catLabels = ['Growkits', 'Spores', 'Liquids', 'Lab', 'Substrates']

  const images = [
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/growkitsCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/sporesCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/liquidCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/labCat.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/substrateCat.png',
  ]

  return (
    <div>
      {/* horizontal carousel for mobile*/}
      <section id="start2" className="block md:hidden bg-customWhite py-4 pb-7">
        <Gutter className="classes.home">
          <h2 className="py-2 font-bold text-2xl text-primary">Shop By Categories</h2>
        </Gutter>
        <SmallCarousel
          icons={null}
          links={links}
          catLabels={catLabels}
          images={images}
          modals={null}
          handleOpenModal={null} // Pass function down to SmallCarousel
          isModalOpen={null} // Pass modal state down to SmallCarousel
          modalContent={null}
        />
      </section>
      {/* /////////// */}
    </div>
  )
}

export default MobileCarousel
