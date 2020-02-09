import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_PASSWORDS_TEMP } from '../../store/actionTypes';

export default function SearchPassword() {
    const [url, setUrl] = useState('')

    const passwords = useSelector(state => state.password.save_password_temp)
    const dispatch = useDispatch()

    const handleForm = (value) => {
        setUrl(value)
        if (!value.length) {
            dispatch({
                type: SAVE_PASSWORDS_TEMP,
                filter: passwords
            })
            return;
        }
        const filtered = []
        passwords.forEach(password => {
            if (password.url.includes(url)) {
                filtered.push(password)
            }
        });
        dispatch({
            type: SAVE_PASSWORDS_TEMP,
            filter: filtered
        })
    }
    const search = (e) => {
        e.preventDefault(); 
        const filtered = []
        passwords.forEach(password => {
            if (password.url.includes(url)) {
                filtered.push(password)
            }
        });
        dispatch({
            type: SAVE_PASSWORDS_TEMP,
            filter: filtered
        })
    }
    return (
        <div className='card rounded shadow-sm'>
            <div className="card-body">
                <form onSubmit={search}>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="search by url" 
                            value={url}
                            onChange={ (e) => handleForm( e.target.value) } 
                        />
                        <small className="form-text text-muted">ex. google.com</small>
                    </div>
                </form>
            </div>
        </div>
    )
}