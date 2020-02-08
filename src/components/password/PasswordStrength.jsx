import React from 'react';
export default function PasswordStrength({ password }) {
    if (!password) {
        return 'password is required'
    }
    return (
        <div className="form-group">
            <small className="form-text text-muted">Password strength:</small>
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="uppercase" 
                    disabled 
                    checked = {/[A-Z]/.test(password)}
                />
                <label className="custom-control-label" htmlFor="uppercase">Uppercase</label>
            </div>
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="lowercase" 
                    disabled 
                    checked = {/[a-z]/.test(password) && password.length}
                />
                <label className="custom-control-label" htmlFor="lowercase">Lowercase</label>
            </div>
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="symbol" 
                    disabled 
                    checked = {/[!@#$&()"]/.test(password)}
                />
                <label className="custom-control-label" htmlFor="symbol">Symbol</label>
            </div>
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="number" 
                    disabled 
                    checked = {/[0-9]/.test(password)}
                />
                <label className="custom-control-label" htmlFor="number">Number</label>
            </div>
            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="length" 
                    disabled 
                    checked = {password.length >= 5}
                />
                <label className="custom-control-label" htmlFor="length">Min 5 length word</label>
            </div>
        </div>
    )
}