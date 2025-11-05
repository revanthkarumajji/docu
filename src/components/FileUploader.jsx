import { useState } from "react";

export default function FileUploader({ onFileSelect }) {
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUrl("");
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (fileUrl) {
      setFileName(fileUrl.split("/").pop());
      setPreviewUrl(fileUrl);
      // Send the URL instead of a file
      onFileSelect(fileUrl);
    }
  };

  const handleReset = () => {
    setFileName(null);
    setFileUrl("");
    setPreviewUrl(null);
    onFileSelect(null);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 w-full">
      <p className="font-semibold mb-2">Upload a File or Provide a Link</p>

      {/* File upload */}
      <input
        type="file"
        accept=".pdf,.xml"
        onChange={handleFileChange}
        className="block w-full mb-3 text-sm text-gray-700"
      />

      {/* OR URL input */}
      <form onSubmit={handleUrlSubmit} className="flex gap-2 mb-3">
        <input
          type="url"
          placeholder="Enter PDF or XML URL..."
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
        >
          Load
        </button>
      </form>

      {/* File info */}
      {fileName && (
        <div className="text-sm text-gray-600 mb-3">
          <p>📄 <strong>{fileName}</strong></p>
          <button
            onClick={handleReset}
            className="text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="mt-3 border-t pt-3">
          {previewUrl.endsWith(".pdf") ? (
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="w-full h-72 border rounded"
            ></iframe>
          ) : (
            <div className="bg-gray-100 p-3 rounded h-72 overflow-auto text-xs">
              <p className="text-gray-700">
                {previewUrl.endsWith(".xml")
                  ? "XML file preview not available in browser (you can still upload it for parsing)."
                  : "Preview not supported for this file type."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
