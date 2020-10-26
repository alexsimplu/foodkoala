import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getUserDocument } from '../Firebase'

const initialValue = {
    isAuthenticated: false,
    user: null,
    displayName: null,
    address: null
}

const AuthContext = React.createContext(initialValue);

function AuthContextProvider({children}) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
             
              let {displayName, address} = await getUserDocument(user.uid);
              setValue({isAuthenticated: true, user, displayName, address});

            } else {
              // User is signed out.
              setValue(initialValue);
            }
          });

    }, []);

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}