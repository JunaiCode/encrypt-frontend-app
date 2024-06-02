import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineCancel } from "react-icons/md";
import './Alert.css';



export default function Alert({ message, type, setShow }) {


    const handleClose = () => {
        setShow(false);
    };

    const selectTitle = (type) => {
        switch (type) {
            case 'error':
                return 'Error';
            case 'success':
                return 'Processed';
            case 'warning':
                return 'Warning';
            case 'corrupted':
                return 'Corrupted';
            default:
                return 'System error';
        }
    }

    const selectIcon = (type) => {
        switch (type) {
            case 'error':
                return './error.svg';
            case 'success':
                return './success.svg';
            case 'warning':
                return './warning.svg';
            case 'corrupted':
                return './corrupted.gif';
            default:
                return './error.svg';
        }
    }

    return (
        (
            <div className='bg'>
                <div className={`alert alert-${type}`}>
                    <div className='icon'>
                        <img src={selectIcon(type)} alt={type} className='img' />
                    </div>
                    <div className='content'>
                        <span className={`title title-${type}`}>{selectTitle(type)}</span>
                        <span className='text'>{message}</span>
                        <button className={`closeBtn closeBtn-${type}`} onClick={handleClose}>
                            {type === 'error' ? 'Cerrar' : 'Ok'}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}