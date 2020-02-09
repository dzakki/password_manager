import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswords, disconnectPassword } from '../store/actions/passsword';
export default function useGetPasswords() {  
    const dispatch = useDispatch()
    const passwords = useSelector(state => state.password.passwords)
    useEffect(() => {
        dispatch(getPasswords())
        return () => {
            disconnectPassword()
        }
    }, [dispatch])

    return passwords
}