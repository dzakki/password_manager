import React from "react";
import { 
    BrowserRouter as Router,
    Route,
    Switch, 
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Auth from '../containers/Auth';
import Password from '../containers/Password';
import { SET_USER } from "../store/actionTypes";

export default function RouterApp (props) {
    const { firebaseAuth } = props
    const dispatch = useDispatch()
    if (firebaseAuth.user) {
        dispatch({
            type: SET_USER,
            data: {
                uid: firebaseAuth.user.uid,
                name: firebaseAuth.user.displayName
            }
        })
    }
    return(
        <Router>
            {
                firebaseAuth.user
                ? <Navigation signOut={firebaseAuth.signOut} />
                : null
            }
            <Switch>
                <Route exact path="/">
                    <Auth firebaseAuth={firebaseAuth} />
                </Route>
                <PrivateRoute path="/passwords" user={firebaseAuth.user}>
                    <Password user={firebaseAuth.user} />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}