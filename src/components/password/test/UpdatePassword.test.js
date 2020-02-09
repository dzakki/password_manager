import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from "../../../store/reducers";
import { BrowserRouter as Router  } from 'react-router-dom';
import UpdatePassword from "../Update";
import { updatePassword, getPassword } from '../../../store/actions/passsword';
import { GET_PASSWORDS, GET_PASSWORD } from '../../../store/actionTypes';
jest.mock('../../../store/actions/passsword')

describe('render update password', function () {  

    const passwordDummy = {
        id: '1',
        url: 'google.com',
        username: 'googleUsername',
        password: 'nantiajaA1!'
    }
    
    test('update a password', function () {  
        const mockedUpdatePassword = jest.fn(() => {
            return {
                type: GET_PASSWORDS,
                data: [passwordDummy]
            }
        })
        const mockedGetPassword = jest.fn(() => {
            return {
                type: GET_PASSWORD,
                data: passwordDummy
            }
        })
        const store = createStore(
            reducers,
            {
                password: {
                    passwords: [],
                    password: null,
                    onload_post: false,
                    status_action_password: false,
                }
            },
        )
        updatePassword.mockImplementation(mockedUpdatePassword)
        getPassword.mockImplementation(mockedGetPassword)
        const { debug, getByTestId, container } = render(
            <Provider store={store}>
                <Router>
                    <UpdatePassword />
                </Router>
            </Provider>
        )
        const formUrl = getByTestId('form-input-url')
        const formUsername = getByTestId('form-input-username')
        const formPassword = getByTestId('form-input-password')

        expect(formUrl.value).toBe(passwordDummy.url)
        expect(formUsername.value).toBe(passwordDummy.username)
        expect(formPassword.value).toBe(passwordDummy.password)
        
        const btnSumbmit = getByTestId('form-btn-submit')
        fireEvent.click(btnSumbmit)
        expect(container).toBeEmpty()
    })

})
