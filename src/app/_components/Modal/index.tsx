import RichText from '../RichText'

export const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <button
          onClick={() => {
            onClose()
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        <div className="mt-4">
          {/* Renderowanie richText */}
          {content.map((block, index) => (
            <p key={index} className="mb-4 text-sm text-gray-800">
              <RichText content={content} />
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
