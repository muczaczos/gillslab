export const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null
  }

  const renderContent = blocks => {
    if (!blocks || !Array.isArray(blocks)) {
      // console.warn('Invalid blocks provided:', blocks)
      return <p style={{ color: 'red' }}>Invalid content structure</p>
    }

    return blocks.map((block, index) => {
      // console.log('Rendering block:', block) // Zalogowanie bloku przed renderowaniem

      if (block.text) {
        // Renderowanie tekstu
        const textStyle = {
          fontWeight: block.bold ? 'bold' : 'normal',
          fontStyle: block.italic ? 'italic' : 'normal',
          textDecoration: block.underline ? 'underline' : 'none',
        }

        return (
          <p key={index} style={textStyle} className="mb-2">
            {block.text}
          </p>
        )
      }

      if (block.type === 'ol' && Array.isArray(block.children)) {
        return (
          <ol key={index} className="list-decimal pl-5">
            {renderContent(block.children)} {/* Rekurencyjne renderowanie dzieci */}
          </ol>
        )
      }

      if (block.type === 'li' && Array.isArray(block.children)) {
        return (
          <li key={index}>
            {renderContent(block.children)} {/* Rekurencyjne renderowanie dzieci */}
          </li>
        )
      }

      if (block.type === 'link' && block.url && Array.isArray(block.children)) {
        return (
          <a
            key={index}
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {renderContent(block.children)} {/* Rekurencyjne renderowanie linku */}
          </a>
        )
      }

      if (Array.isArray(block.children)) {
        return (
          <div key={index} className="mb-2">
            {renderContent(block.children)} {/* Rekurencyjne renderowanie dzieci */}
          </div>
        )
      }

      // console.warn('Unhandled block:', block) // Logowanie nieobsługiwanego bloku
      /* return (
        <p key={index} style={{ color: 'red' }}>
          Unhandled content structure
        </p>
      )*/
    })
  }

  //console.log('Modal Data:', JSON.stringify(content, null, 2)) // Zalogowanie danych modal

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-35 z-50">
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
          {/* Renderowanie pełnej zawartości RichText */}
          {renderContent(content.Modal)} {/* Poprawne przekazanie danych */}
        </div>
      </div>
    </div>
  )
}
