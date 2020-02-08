import { 
    GET_PASSWORDS, 
    STATUS_ACTION_PASSWORD, 
    ONLOAD_PASSWORDS,
    ONLOAD_PASSWORD, 
    GET_PASSWORD,
} from '../actionTypes';
import firebase from "../../config/firebase";
import 'firebase/firestore'

const db  = firebase.firestore()

let dbPassword;

export const getPasswords = () => (dispatch, state) => {
    dispatch({
        type: ONLOAD_PASSWORDS
    })

    dbPassword = db.collection("passwords").where("userUid", "==", state().user.uid)
                    .onSnapshot(function(querySnapshot) {
                        const data = []
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        });
                        dispatch({
                            type: GET_PASSWORDS,
                            data
                        })    
                    }, function (err) {  
                        console.log(err)
                        dispatch({
                            type: 'ERRORS',
                            data: 'load passwords failed: internal server errors'
                        })
                    });
}

export const getPassword = (id) => dispatch => {
    dispatch({
        type: ONLOAD_PASSWORD
    })
    db.collection("passwords").doc(id).get()
        .then(doc => {
            dispatch({
                type: GET_PASSWORD,
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            })
        })
        .catch(err => console.log(err))
}

export const addPassword = (form) => (dispatch, state) => {
    form.userUid = state().user.uid;
    dispatch({
        type: STATUS_ACTION_PASSWORD
    })
    dispatch({
        type: ONLOAD_PASSWORDS
    })
    db
        .collection('passwords').add(form)
        .then(() => {
            dispatch({
                type: 'SUCCESS',
                data: 'add password success'
            })
        })
        .catch(() => {
            dispatch({
                type: 'ERRORS',
                data: 'add password failed: internal server errors'
            })
        })
}

export const updatePassword = (form, id) => dispatch => {
    dispatch({
        type: STATUS_ACTION_PASSWORD
    })
    dispatch({
        type: ONLOAD_PASSWORDS
    })
    db
        .collection('passwords').doc(id).set(form)
        .then(() => {
            dispatch({
                type: 'SUCCESS',
                data: 'update password password success'
            })
        })
        .catch(() => {
            dispatch({
                type: 'ERRORS',
                data: 'update password failed: internal server errors'
            })
        })
}

export const deletePassword = (id) => dispatch => {
    db
        .collection('passwords').doc(id).delete()
        .then(() => {
            dispatch({
                type: 'SUCCESS',
                data: 'delete password success'
            })
        })
        .catch(err => {
            dispatch({
                type: 'ERRORS',
                data: 'delete password failed: internal server errors'
            })
        })
}

export const disconnectPassword = () => dispatch => {
    dbPassword()
    dispatch({
        type: GET_PASSWORDS,
        data: []
    })
}