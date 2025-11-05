import React from 'react'

export default function SummaryControls({ value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2">Summary length</label>
      <div className="flex gap-3">
        <label className={`px-3 py-2 border rounded cursor-pointer ${value==='tiny' ? 'bg-indigo-50 border-indigo-300' : ''}`}>
          <input type="radio" name="summary" value="tiny" checked={value==='tiny'} onChange={e => onChange(e.target.value)} className="mr-2" />
          Tiny (~50 words)
        </label>

        <label className={`px-3 py-2 border rounded cursor-pointer ${value==='short' ? 'bg-indigo-50 border-indigo-300' : ''}`}>
          <input type="radio" name="summary" value="short" checked={value==='short'} onChange={e => onChange(e.target.value)} className="mr-2" />
          Short (100–150 words)
        </label>

        <label className={`px-3 py-2 border rounded cursor-pointer ${value==='long' ? 'bg-indigo-50 border-indigo-300' : ''}`}>
          <input type="radio" name="summary" value="long" checked={value==='long'} onChange={e => onChange(e.target.value)} className="mr-2" />
          Long (~200 words)
        </label>
      </div>
    </div>
  )
}
