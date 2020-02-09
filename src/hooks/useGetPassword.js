import { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPassword } from '../store/actions/passsword';
import { GET_PASSWORD } from "../store/actionTypes";

export default function useGetPassword(id) {  
    const dispatch = useDispatch()
    const data = useSelector(state => state.password.password)
    useEffect(() => {
        dispatch(getPassword(id))   
        return () => {
            dispatch({
                type: GET_PASSWORD,
                data: null
            })
        }
    }, [dispatch, id])

    return data
}