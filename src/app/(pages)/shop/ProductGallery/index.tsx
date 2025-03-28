import { useState } from 'react'
import Image from 'next/image'

import classes from './index.module.scss'

const ProductGallery = ({ product }) => {
  // State do przechowywania aktualnie wybranego obrazka
  const [selectedImage, setSelectedImage] = useState(
    product?.meta?.image?.filename
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${product.meta.image.filename}`
      : `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`,
  )

  // State do kontrolowania widoczności modala
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Funkcja do otwierania modala
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Funkcja do zamykania modala
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Obrazy do galerii

  //console.log(product)
  return (
    <div className="pt-20 lg:mb-20 bg-customWhite lg:w-1/2 lg:pt-0">
      <div className="lg:mt-6 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
        <h6 className="text-primary text-4xl font-medium md:text-6xl">Gallery</h6>
      </div>
      <div className={`${classes.contentGradient} flex flex-col items-center p-0`}>
        <section className="flex justify-center gap-4 p-4 bg-transparent h-[300px] csm:h-[400px] sm:h-[600px] xs:w-4/5 lg:w-full">
          {/* Duży obrazek po lewej */}
          <div className="flex items-center justify-center w-full">
            <div className="w-full flex justify-center ">
              <Image
                src={selectedImage} // Aktualnie wybrany obrazek
                alt="Main Image"
                width="600"
                height="600"
                className="sm:w-[600px] cursor-pointer"
                onClick={openModal} // Po kliknięciu otwiera modal
              />
            </div>
          </div>

          {/* Modal do wyświetlenia powiększonego obrazka */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
              {/* Przycisk zamknięcia */}
              <div
                className="absolute top-4 right-4 bg-transparent text-customWhite text-6xl font-bold z-50"
                onClick={closeModal}
              >
                &times;
              </div>

              <div className="relative">
                <Image
                  src={selectedImage}
                  alt="Enlarged Image"
                  width="1000"
                  height="1000"
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            </div>
          )}
        </section>

        {/* Małe obrazki po prawej */}
        <div className="flex flex-row gap-4 justify-center pb-5">
          <Image
            src={
              product?.meta?.image?.filename
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${product.meta.image.filename}`
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`
            }
            alt={product?.media1?.alt || 'Brak opisu'}
            width="75"
            height="75"
            className="cursor-pointer object-cover"
            onClick={() =>
              setSelectedImage(
                product?.meta?.image?.filename
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${product.meta.image.filename}`
                  : `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`,
              )
            }
          />

          <Image
            src={
              product?.media2?.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`
            }
            alt={product?.media2?.alt || 'Brak opisu'}
            width="75"
            height="75"
            className="cursor-pointer object-cover"
            onClick={() =>
              setSelectedImage(
                product?.media2?.url ||
                `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`,
              )
            }
          />

          <Image
            src={
              product?.media3?.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`
            }
            alt={product?.media3?.alt || 'Brak opisu'}
            width="75"
            height="75"
            className="cursor-pointer object-cover"
            onClick={() =>
              setSelectedImage(
                product?.media3?.url ||
                `${process.env.NEXT_PUBLIC_SERVER_URL}/media/placeholder.png`,
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
