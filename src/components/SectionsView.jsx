import React from 'react'

export default function SectionsView({ sections }) {
  if (!sections || sections.length === 0) return <div className="text-sm text-gray-500">No sections found.</div>
  return (
    <div className="mt-2 space-y-2">
      {sections.map((s, i) => (
        <div key={i} className="p-3 bg-white border rounded">
          <div className="text-sm font-semibold">{s.title || `Section ${i+1}`}</div>
          <div className="text-sm text-gray-700 mt-1">{s.text.slice(0, 280)}{s.text.length>280 ? '…' : ''}</div>
        </div>
      ))}
    </div>
  )
}
