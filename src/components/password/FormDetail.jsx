import React, { useState } from "react";
import { useParams, Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import alertify from 'alertifyjs';
import { deletePassword } from '../../store/actions/passsword';
import useGetPassword from '../../hooks/useGetPassword';
import PasswordStrength from './PasswordStrength';

export default function FormDetailPassword() {
    const { id } = useParams()
    const form = useGetPassword(id)
    const dispatch = useDispatch()
    const [typeElPassword, setTypeElPassword] = useState(true)
    const [isRedirect, setIsRedirect] = useState(false)

    if (isRedirect) {
        return (
            <Redirect 
                to="/passwords"
                replace
            />
        )
    }

    const handleTypeElPassword = () => {
        setTypeElPassword(!typeElPassword)
    }

    const preDeletePassword = () => {
        alertify.confirm(
            "Delete password",
            "Are you sure, want to delete this?...",
            function(){
                dispatch(deletePassword(id))
                setIsRedirect(true)
            },
            function(){
                alertify.error('Canceled');
            }
        );
    }

    if (!form) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='card rounded shadow-sm'>
            <div className="card-header bg-white">
                <div className="float-right">
                    <Link to={`/passwords/update/${form.id}`} className="btn btn-outline-dark btn-sm mr-1">Update</Link>
                    <button className="btn btn-sm btn-outline-danger mr-1" onClick={preDeletePassword}>Delete</button>
                    <Link to="/passwords" className="btn btn-outline-warning btn-sm">X</Link>
            </div>
                </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                    <small className="form-text text-muted">url</small>
                        <input 
                            className="form-control-plaintext" 
                            type="text" 
                            placeholder="url" 
                            data-testid='form-input-url'
                            value={form.url}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <small className="form-text text-muted">Username</small>
                        <input 
                            className="form-control-plaintext" 
                            type="text" 
                            placeholder="username" 
                            data-testid='form-input-username'
                            value={form.username}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <small className="form-text text-muted">Password</small>
                        <div className="d-flex">
                            <input 
                                className="form-control-plaintext" 
                                type={typeElPassword ? 'password' : 'text'} 
                                placeholder="password" 
                                data-testid='form-input-password'
                                value={form.password}
                                readOnly
                            />
                            <span 
                                className='mt-1' 
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick = { handleTypeElPassword}
                            >
                                <small>{typeElPassword ? 'Show' : 'Hide'} </small>
                            </span>
                        </div>
                    </div>
                    <PasswordStrength password={form.password} />
                </form>
            </div>
        </div>
    )   
}