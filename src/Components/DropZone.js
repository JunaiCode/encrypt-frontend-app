import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineCancel } from "react-icons/md";
import './MyDropzone.css';

function MyDropzone({ mode }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const removeFile = () => {
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: '.txt,.pdf,.docx', // Tipos de archivos admitidos
  });

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {selectedFile && (
        <div className="file-info">
          <p>Selected file: {selectedFile.name}</p>
          <MdOutlineCancel className="remove-button" onClick={removeFile} />
        </div>
      )}
        {isDragActive && !selectedFile ? (
          <p>Drop the file here...</p>
        ) : (
          !selectedFile && <p>Drag 'n' drop a file here, or click to select a file</p>
        )}
      </div>
      <button className="button">{mode==="encrypt"?"Encrypt":"Decrypt"}</button>
    </div>
  );
}

export default MyDropzone;