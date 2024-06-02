import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineCancel } from "react-icons/md";
import Alert from './Alert';
import './MyDropzone.css';

function MyDropzone({ mode, keyValue }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const setShow = (value) => {
    setAlert(value);
  }

  const handleClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('key', keyValue);

      const url = mode === "encrypt"
        ? 'http://localhost:8080/encryptor/encrypt'
        : 'http://localhost:8080/encryptor/decrypt';

      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            setAlert({
              message: response.message,
              type: 'error',
              show: true
            });
            response.json().then(data => {
              console.log(data);
              if(data.message === "Hash does not match, data integrity compromised!"){
                setAlert({
                  message: data.message,
                  type: 'corrupted',
                  show: true
                });
              }else{
                setAlert({
                  message: data.message,
                  type: 'error',
                  show: true
                });
              }
              
            });

          } else {
            return response.blob().then(blob => {
              const downloadUrl = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = selectedFile.name; // Puedes cambiar el nombre del archivo si es necesario
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(downloadUrl);
              setAlert({
                message: "The file was processed successfully",
                type: 'success',
                show: true
              });
            })
          }
        })

        .catch(error => {
          setAlert({
            message: "Password is incorrect",
            type: 'error',
            show: true
          });
          console.error(error);
        });
    } else {
      setAlert({
        message: "Please select a file",
        type: 'warning',
        show: true
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: '.txt,.pdf,.docx', // Tipos de archivos admitidos
  });

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} setShow={setAlert} />}
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
        <button onClick={handleClick} className="button">
          {mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>

      </div>
    </>
  );
}

export default MyDropzone;
