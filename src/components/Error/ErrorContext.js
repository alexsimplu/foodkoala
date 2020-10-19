import React, { useState } from 'react'

const ErrorContext = React.createContext({
    message: ''
});


export default function ErrorContextProvider({ children }) {
    const [message, setMessage] = useState('');
    
    return (
        <ErrorContext.Provider value={ {message, setMessage} }>
            { children }
        </ErrorContext.Provider>
    )
}


export {
    ErrorContext
};