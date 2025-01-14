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

// Komponent do wyboru koloru (HEX i picker)
const ColorInput: React.FC<{ color: string; onChange: (color: string) => void }> = ({
  color,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Picker koloru */}
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
        style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
      />
      {/* Pole tekstowe dla wartości HEX */}
      <input
        type="text"
        value={color}
        onChange={e => {
          const value = e.target.value
          // Walidacja czy kolor jest w formacie HEX
          if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value) || value === '') {
            onChange(value)
          }
        }}
        maxLength={7}
        placeholder="#000000"
        style={{
          width: '100px',
          padding: '4px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
    </div>
  )
}

// Przycisk do ustawiania koloru
const LeafButton: React.FC<{ format: string }> = ({ format }) => {
  const editor = useSlate()
  const [color, setColor] = React.useState('#000000')

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <ColorInput color={color} onChange={newColor => setColor(newColor)} />
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
