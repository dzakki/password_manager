import React, { useState } from 'react';
import { Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPassword } from '../../store/actions/passsword';
import Form from './Form';

export default function AddPassword() {
    const [isRedirect, setIsredirect] = useState(false)
    const statusActionPassword = useSelector(state => state.password.status_action_password)
    const dispatch = useDispatch()
    const preAddPassword = (payload) => {
        console.log(payload)
        dispatch(addPassword(payload))
        if(!statusActionPassword){
            setIsredirect(true)
        }
    }
    if (isRedirect) {
        return <Redirect to='/passwords' />
    }
    return (
        <Form 
            submitAddPassword = {preAddPassword} 
        />
    )
}