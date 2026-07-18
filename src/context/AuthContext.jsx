import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;
    const noviEndPoint = import.meta.env.VITE_NOVI_API;

    const [ isAuth, toggleIsAuth ] = useState( {
        isAuth: false,
        user: null,
        status: 'pending',
    } );
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem( 'token' );

        if ( token ) {
            const decoded = jwtDecode( token );
            void fetchUserData( decoded.userId, token );
        } else {
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }, [] );

    function login( JWT ) {
        localStorage.setItem( 'token', JWT );
        const decoded = jwtDecode( JWT );

        void fetchUserData( decoded.userId, JWT, '/account' );
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );
        navigate( '/' );
    }

    async function fetchUserData( id, token, redirectUrl ) {
        try {
            const result = await axios.get( `${noviEndPoint}users/${ id }`, {
                headers: {
                    'novi-education-project-id': noviProjectId,
                    Authorization: `Bearer ${ token }`,
                },
            } );

            toggleIsAuth( {
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            } );

            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch ( e ) {
            console.error( e );
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;