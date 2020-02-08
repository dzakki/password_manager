import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateNavigation (props) {
    return (
        <Route {...props} >
            {
                props.user
                    ? props.children
                    : <Redirect 
                        to={{
                            pathname: "/"
                        }}
                    />
            }
        </Route>
    )
}