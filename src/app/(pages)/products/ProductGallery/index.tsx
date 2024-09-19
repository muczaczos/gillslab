import { useState } from 'react'
import Image from 'next/image'

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
    <section className="mb-10 flex gap-4 p-4 bg-transparent h-[300px]">
      {/* Duży obrazek po lewej */}
      <div className="flex-none w-2/3 h-full">
        <Image
          src={selectedImage} // Aktualnie wybrany obrazek
          alt="Main Image"
          width="500"
          height="500"
          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
          onClick={openModal} // Po kliknięciu otwiera modal
        />
      </div>

      {/* Małe obrazki po prawej */}
      <div className="flex flex-col gap-4 w-1/3 h-full">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            width="500"
            height="500"
            className="w-full h-1/3 object-cover rounded-lg shadow-md cursor-pointer"
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
  )
}

export default ProductGallery
