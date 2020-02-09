import React from 'react';
import { Switch, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import useGetPasswords from '../hooks/useGetPasswords';
import SidebarPassword from '../components/password/Sidebar';
import ListPassword from '../components/password/List';
import FormDetailPassword from "../components/password/FormDetail";
import UpdatePassword from '../components/password/Update';
import AddPassword from '../components/password/Add';

export default function Password(props) {
    // const params = useParams()
    const {passwords, onload_passwords} = useSelector(state => state.password)
    useGetPasswords()
    return (
        <>
            <SidebarPassword />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            {
                                onload_passwords
                                ?   (
                                        <div className="text-center col-12">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )
                                :   !passwords.length
                                        ? ('there are\'t passwords')
                                        : (
                                            passwords.map(password => {
                                                return <div className="col-6 mb-3" key={password.id}>
                                                            <ListPassword item={password} />
                                                        </div>
                                            })
                                        )
                            }
                        </div>
                    </div>
                    <div className="col-4">
                        <Switch>
                            <Route exact path="/passwords/add">
                                <AddPassword />
                            </Route>
                            <Route exact path="/passwords/update/:id">
                                <UpdatePassword />           
                            </Route>
                            <Route path="/passwords/:id">
                                <FormDetailPassword />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}