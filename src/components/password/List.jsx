import React from 'react';
import { Link } from 'react-router-dom';

export default function ListPassword(props) {
    const { item } = props
    return (
        <Link 
            to={`/passwords/${item.id}`}
            className="card shadow-sm text-dark" 
            style={{
                cursor: 'pointer',
                textDecoration: 'none'
            }}
            data-testid="passwords-list"
        >
            <div className="card-body">
                <h5 className="card-title">
                    {item.url}
                </h5>
                <div>
                    Username: {item.username}
                </div>
                <div>
                    Password: {item.password}
                </div>
            </div>
        </Link>
    )    
}