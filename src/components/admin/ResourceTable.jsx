import { Edit2, Trash2 } from 'lucide-react'

export default function ResourceTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-coffee-500/10 text-sm">
          <thead className="bg-coffee-50 text-left text-coffee-900">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-bold">{column.label}</th>
              ))}
              <th className="px-4 py-3 font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-500/10">
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-coffee-900/75">{column.render ? column.render(row) : row[column.key]}</td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="rounded-md border border-coffee-500/20 p-2" onClick={() => onEdit(row)} aria-label="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="rounded-md border border-red-200 p-2 text-red-700" onClick={() => onDelete(row.id)} aria-label="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
