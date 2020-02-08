import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Navigation ({ signOut }) {
    return (
        <nav className="navbar navbar-light shadow-sm bg-white">
            <span className="navbar-brand mb-0 h1">Password manager</span>
            <button 
                className="btn btn-sm btn-outline-light text-dark"
                onClick={() => {
                    signOut()
                    return <Redirect to='/' />
                }}
            >
                Logout
            </button>
        </nav>
    )
}