import React, { createContext, useEffect, useState } from 'react'
import { AuthContent } from './authContent'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { auth } from '../firebase/firebase.init';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";



const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)

    };

    const signOutGoogle = () => {
        return signOut(auth)
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // jwt api call
            if (currentUser) {
                const logUser = { email: currentUser.email }

                fetch('https://smart-deal-eta.vercel.app/getToken', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(logUser)
                })
                    .then(res => res.json())
                    .then(data => console.log('after geting token', data))
            }
            setLoading(false);

        });
        return () => {
            unsub();
        }
    }, [])


    const authInfo = {
        createUser,
        signUser,
        signGoogle,
        signOutGoogle,
        user,
        loading,
        setLoading
    }
    // console.log(user?.accessToken);

    return (
        <AuthContent value={authInfo}>
            {children}
        </AuthContent>
    )
}

export default AuthProvider
