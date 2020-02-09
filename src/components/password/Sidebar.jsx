import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarPassword() {
    return (
        <div
            className="mt-3" 
            style={{
                right: '0',
                position: 'fixed'
            }}
        >
            <Link 
                to="/passwords/add" 
                data-testid="add-password"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    color: 'white',
                    fontSize: '15px',
                    backgroundColor: '#55ACEE'
                }}
            >
                Add
            </Link>
        </div>
    )
}