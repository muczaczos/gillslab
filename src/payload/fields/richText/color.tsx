import React from 'react'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

const name = 'color_picker' // Nazwa liścia

// Sprawdzanie, czy znacznik (mark) jest aktywny
const isMarkActive = (editor: Editor, format: string): boolean => {
  const marks = Editor.marks(editor)
  return marks ? typeof marks[format] === 'string' : false
}

// Przełączanie stanu liścia (dodanie/usunięcie koloru)
const toggleLeaf = (editor: Editor, format: string, color: string) => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, color)
  }
}

// Komponent do wyboru koloru
const ColorInput: React.FC<{ onChange: (color: string) => void }> = ({ onChange }) => {
  return (
    <input
      type="color"
      defaultValue="#000000"
      onChange={e => onChange(e.target.value)}
      style={{ marginRight: '8px' }}
    />
  )
}

// Przycisk do ustawiania koloru
const LeafButton: React.FC<{ format: string }> = ({ format }) => {
  const editor = useSlate()
  const [color, setColor] = React.useState('#000000')

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ColorInput onChange={newColor => setColor(newColor)} />
      <button
        type="button"
        className="rich-text__button"
        onMouseDown={event => {
          event.preventDefault()
          toggleLeaf(editor, format, color)
        }}
      >
        Apply Color
      </button>
    </div>
  )
}

// Komponent renderujący liść z kolorem
const Leaf: React.FC<any> = ({ attributes, leaf, children }) => {
  if (leaf[name]) {
    return (
      <span
        {...attributes}
        style={{
          color: leaf[name], // Ustawienie koloru liścia
        }}
      >
        {children}
      </span>
    )
  }
  return <span {...attributes}>{children}</span>
}

// Eksport do Payload CMS
export default {
  name,
  Button: () => <LeafButton format={name} />, // Komponent przycisku
  Leaf, // Komponent renderujący liść
}
