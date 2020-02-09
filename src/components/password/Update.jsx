import React, { useState } from 'react';
import { useParams, Redirect} from 'react-router-dom';
import useGetPassword from '../../hooks/useGetPassword';
import { useDispatch, useSelector } from 'react-redux';
import {updatePassword} from '../../store/actions/passsword';
import Form from './Form';

export default function UpdatePassword() {
    const { id } = useParams()
    const [isRedirect, setIsredirect] = useState(false)
    const statusActionPassword = useSelector(state => state.password.status_action_password)
    useGetPassword(id)
    const { password } = useSelector(state => state.password)
    const dispatch = useDispatch()
    const preUpdatePassword = (payload) => {
        dispatch(updatePassword(payload, id))
        if(!statusActionPassword){
            setIsredirect(true)
        }
    }
    if (isRedirect) {
        return <Redirect to='/passwords' replace />
    }
    if(!password){
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <Form 
            update= {true} 
            password={password} 
            submitUpdatePassword = {preUpdatePassword} 
        />
    )
}