import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Pilcrow, Quote, Type, Underline } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { sanitizeHtml } from '../../utils/html'

const blockOptions = [
  { label: 'Title', value: 'H1', icon: Heading1 },
  { label: 'Subtitle', value: 'H2', icon: Heading2 },
  { label: 'Body', value: 'P', icon: Pilcrow },
]

const sizeOptions = [
  { label: 'Kecil', value: '0.875rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Besar', value: '1.125rem' },
  { label: 'Sorotan', value: '1.25rem' },
]

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  function emitChange() {
    onChange(sanitizeHtml(editorRef.current?.innerHTML || ''))
  }

  function focusEditor() {
    editorRef.current?.focus()
  }

  function runCommand(command, commandValue = null) {
    focusEditor()
    document.execCommand(command, false, commandValue)
    emitChange()
  }

  function applyTextSize(size) {
    focusEditor()

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return

    const range = selection.getRangeAt(0)
    const span = document.createElement('span')
    span.style.fontSize = size
    span.appendChild(range.extractContents())
    range.insertNode(span)
    selection.removeAllRanges()
    selection.addRange(range)
    emitChange()
  }

  return (
    <div className="overflow-hidden rounded-md border border-coffee-500/20 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-coffee-500/10 bg-coffee-50 p-2">
        {[
          [Bold, 'bold', 'Bold'],
          [Italic, 'italic', 'Italic'],
          [Underline, 'underline', 'Underline'],
        ].map(([Icon, command, label]) => (
          <button key={command} type="button" className="rounded-md p-2 text-coffee-900 hover:bg-white" onClick={() => runCommand(command)} title={label}>
            <Icon size={18} />
          </button>
        ))}

        <span className="mx-1 h-6 w-px bg-coffee-500/20" />

        {blockOptions.map(({ label, value, icon: Icon }) => (
          <button key={value} type="button" className="rounded-md p-2 text-coffee-900 hover:bg-white" onClick={() => runCommand('formatBlock', value)} title={label}>
            <Icon size={18} />
          </button>
        ))}

        <span className="mx-1 h-6 w-px bg-coffee-500/20" />

        <button type="button" className="rounded-md p-2 text-coffee-900 hover:bg-white" onClick={() => runCommand('insertUnorderedList')} title="Bullet list">
          <List size={18} />
        </button>
        <button type="button" className="rounded-md p-2 text-coffee-900 hover:bg-white" onClick={() => runCommand('insertOrderedList')} title="Numbered list">
          <ListOrdered size={18} />
        </button>
        <button type="button" className="rounded-md p-2 text-coffee-900 hover:bg-white" onClick={() => runCommand('formatBlock', 'BLOCKQUOTE')} title="Quote">
          <Quote size={18} />
        </button>

        <label className="ml-auto flex items-center gap-2 rounded-md bg-white px-2 py-1 text-sm text-coffee-900">
          <Type size={16} />
          <select className="bg-transparent outline-none" defaultValue="" onChange={(event) => applyTextSize(event.target.value)}>
            <option value="" disabled>Ukuran</option>
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div
        ref={editorRef}
        className="rich-editor min-h-72 px-4 py-3 text-coffee-900 outline-none"
        contentEditable
        role="textbox"
        aria-label="Konten artikel"
        onInput={emitChange}
        onBlur={emitChange}
        suppressContentEditableWarning
      />
    </div>
  )
}
