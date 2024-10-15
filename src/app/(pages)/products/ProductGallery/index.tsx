import { useState } from 'react'
import Image from 'next/image'

import classes from './index.module.scss'

const ProductGallery = () => {
  // State do przechowywania aktualnie wybranego obrazka
  const [selectedImage, setSelectedImage] = useState(
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/gtLabel.png',
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
  const images = [
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/gtLabel.png',
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/mckLabel.png', // Dodaj inne obrazy jeśli masz
    process.env.NEXT_PUBLIC_SERVER_URL + '/media/gtLabel.png',
  ]

  return (
    <div className="pt-20 bg-customWhite lg:w-1/2 lg:pt-0">
      <div className="lg:mt-6 mx-5 border-solid border-b-0 border-r-0 border-t-1 border-l-1 border-primary pl-5 py-4">
        <h6 className="text-primary text-4xl font-medium md:text-6xl">Gallery</h6>
      </div>
      <div className={`${classes.contentGradient} flex flex-col items-center p-0`}>
        <section className="flex justify-center gap-4 p-4 bg-transparent h-[300px] csm:h-[400px] sm:h-[600px] xs:w-4/5 lg:w-full">
          {/* Duży obrazek po lewej */}
          <div className="flex items-center justify-center w-3/4">
            <div className="w-full flex justify-center lg:pb-14">
              <Image
                src={selectedImage} // Aktualnie wybrany obrazek
                alt="Main Image"
                width="300"
                height="300"
                className="sm:w-[400px] rounded-lg shadow-lg cursor-pointer"
                onClick={openModal} // Po kliknięciu otwiera modal
              />
            </div>
          </div>

          {/* Małe obrazki po prawej */}
          <div className="flex flex-col gap-4 justify-center">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                width="75"
                height="75"
                className="rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(image)} // Zmieniamy obrazek po lewej po kliknięciu
              />
            ))}
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
                  width="500"
                  height="500"
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProductGallery
