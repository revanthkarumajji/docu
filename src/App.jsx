import React, { useState } from 'react'
import FileUploader from './components/FileUploader'
import SummaryControls from './components/SummaryControls'
import SectionsView from './components/SectionsView'
import SectionChart from './components/SectionChart'
import { uploadFile } from './api'

export default function App() {
  const [file, setFile] = useState(null)
  const [summaryLength, setSummaryLength] = useState('tiny')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit() {
    if (!file) {
      setError('Please choose a file to upload.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const data = await uploadFile(file, summaryLength)
      setResult(data)
    } catch (e) {
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Docustitch — Upload demo</h1>

        <FileUploader file={file} setFile={setFile} />

        <SummaryControls value={summaryLength} onChange={setSummaryLength} />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload & Summarize'}
          </button>

          <button
            onClick={() => { setFile(null); setResult(null); setError(null) }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        {result && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="p-4 bg-slate-50 rounded">{result.summary}</div>

              <h3 className="mt-4 font-semibold">Parsed Sections</h3>
              <SectionsView sections={result.sections} />
            </div>

            <div>
              <h2 className="font-semibold mb-2">Section Lengths</h2>
              <SectionChart sections={result.sections} />
              <h3 className="mt-4 font-semibold">Metadata</h3>
              <pre className="p-3 bg-slate-50 rounded text-sm overflow-auto">{JSON.stringify(result.meta, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-6 text-center text-xs text-gray-500">Demo UI — connect this to your Docustitch backend later</footer>
    </div>
  )
}
