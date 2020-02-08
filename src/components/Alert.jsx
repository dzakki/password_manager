import { useSelector, useDispatch } from 'react-redux';
import alertify from 'alertifyjs';

export default function Alert(){
    const dispatch = useDispatch()
    const alert = useSelector(state => state.general)

    if (alert.success) {
        const msg = JSON.parse(JSON.stringify(alert.success))
        dispatch({
            type: 'SUCCESS',
            data: null
        })
        alertify.success(msg)
    }
    if (alert.errors) {
        const msg = JSON.parse(JSON.stringify(alert.errors))
        dispatch({
            type: 'ERRORS',
            data: null
        })
        alertify.error(msg)
    }
    return ''
}