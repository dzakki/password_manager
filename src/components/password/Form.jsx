import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import PasswordStrength from './PasswordStrength';

export default function FormPassword(props) {
    const dispatch = useDispatch()
    const dataForm = {
        url: '',
        username: '',
        password: ''
    }
    const [form, setForm] = useState(props.password || dataForm)
    const handleForm = (key, value) => {
        const newValueForm = {
            ...form
        }
        newValueForm[key] = value
        setForm(newValueForm)
    }

    const validateForm = () => {
        const errors = []
        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                if (!form[key]) {
                    errors.push(`${key} is required`)   
                }
            }
        }
        if (errors.length) {
            dispatch({
                type: 'ERRORS',
                data: errors.join(', ')
            })   
            return false
        }
        return true
    }

    const renderBtnSubmit = () => {
        if (props.update) {
            return (
                <>
                <button 
                    className="btn btn-outline-dark btn-sm mr-1" 
                    data-testid='form-btn-submit'
                    onClick={() => {
                        const validate = validateForm()
                        if (validate) {
                            props.submitUpdatePassword(form)
                            setForm({
                                url: '',
                                username: '',
                                password: ''
                            })   
                        }
                    }}
                >
                    Update
                </button>
                </>
            )
        }else{
            return (
                <>
                <button 
                    className="btn btn-outline-dark btn-sm mr-1" 
                    data-testid='form-btn-submit'
                    onClick={() => {
                        const validate = validateForm()
                        if (validate) {
                            props.submitAddPassword(form)
                            setForm({
                                url: '',
                                username: '',
                                password: ''
                            })   
                        }
                    }}
                >
                    Save
                </button>
                </>
            )
        }
    }

    return (
        <div className='card rounded shadow-sm'>
            <div className="card-header bg-white">
                <div className="float-right">
                    {
                        renderBtnSubmit()
                    }
                    <Link to="/passwords" className="btn btn-outline-dark btn-sm">Cancel</Link>
                    
            </div>
                </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="url" 
                            data-testid='form-input-url'
                            value={form.url}
                            onChange={ (e) => handleForm('url', e.target.value) } 
                        />
                        <small className="form-text text-muted">ex. google.com</small>
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="username" 
                            data-testid='form-input-username'
                            value={form.username}
                            onChange={ (e) => handleForm('username', e.target.value) } 
                        />
                        <small className="form-text text-muted">ex. google1</small>
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="password" 
                            placeholder="password" 
                            data-testid='form-input-password'
                            value={form.password}
                            onChange={ (e) => handleForm('password', e.target.value) } 
                        />
                    </div>
                    <PasswordStrength password={form.password} />
                </form>
            </div>
        </div>
    )   
}