import React, { useContext, useState, useEffect } from 'react';
import { ErrorContext } from './ErrorContext';

import errorIcon from './proxy-image.png';

export default function Error({ onReloadClicked }) {
    const { message } = useContext(ErrorContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
        }
    }, [message]);

    // function handleReload(e) {
    //     e.preventDefault();
    //     onReloadClicked(e);
    // }

    function handleClose() {
        setShow(false);
    }

    return (
        // <div className="alert alert-danger" role="alert">
        //     <p>Ooops! Something went wrong! Please try again later!</p>
        //     <a href="/" onClick={ handleReload }>Reload</a>
        // </div>
        <div
            aria-live='polite'
            aria-atomic='true'
            style={{
                position: 'fixed',
                minHeight: '200px',
                minWidth: '500px',
                right: 0,
                top: '200px',
                zIndex: 1,
            }}
        >
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <div
                    className={`toast fade${show ? ' show' : ''}`}
                    role='alert'
                    aria-live='assertive'
                    aria-atomic='true'
                >
                    <div className='toast-header'>
                        <img
                            src={errorIcon}
                            width='20'
                            className='rounded mr-2'
                            alt='Error icon'
                        />
                        <strong className='mr-auto'>Error</strong>
                        <small>Right now</small>
                        <button
                            type='button'
                            className='ml-2 mb-1 close'
                            data-dismiss='toast'
                            aria-label='Close'
                            onClick={handleClose}
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='toast-body'>{message}</div>
                </div>
            </div>
        </div>
    );
}
