// simple front-end wrapper for backend calls
export async function uploadFile(file, summaryLength) {
  const form = new FormData()
  form.append('file', file)
  form.append('summary_length', summaryLength) // "tiny" | "short" | "long"

  const resp = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: form
  })

  if (!resp.ok) throw new Error('Upload failed: ' + resp.statusText)
  return resp.json()
}
