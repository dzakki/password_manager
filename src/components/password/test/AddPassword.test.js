import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import reducers from "../../../store/reducers";
import { BrowserRouter as Router  } from 'react-router-dom';
import AddPassword from "../Add";
import { addPassword } from '../../../store/actions/passsword';
import { GET_PASSWORDS } from '../../../store/actionTypes';
jest.mock('../../../store/actions/passsword')

describe('render add password', function () {  

    const passwordDummy = {
        url: 'google.com',
        username: 'googleUsername',
        password: 'nantiajaA1!'
    }
    
    test('adding new password', function () {  
        const mockedAddPassword = jest.fn(() => {
            return {
                type: GET_PASSWORDS,
                data: [passwordDummy]
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

        addPassword.mockImplementation(mockedAddPassword);
        const { debug, getByTestId, container } = render(
            <Provider store={store}>
                <Router>
                    <AddPassword />
                </Router>
            </Provider>
        )

        const formUrl = getByTestId('form-input-url')
        const formUsername = getByTestId('form-input-username')
        const formPassword = getByTestId('form-input-password')

        expect(formUrl.value).toBe('')
        expect(formUsername.value).toBe('')
        expect(formPassword.value).toBe('')

        fireEvent.change(formUrl, { target: { value: passwordDummy.url } })
        fireEvent.change(formUsername, { target: { value: passwordDummy.username } })
        fireEvent.change(formPassword, { target: { value: passwordDummy.password } })

        expect(formUrl.value).toBe(passwordDummy.url)
        expect(formUsername.value).toBe(passwordDummy.username)
        expect(formPassword.value).toBe(passwordDummy.password)
        
        const btnSumbmit = getByTestId('form-btn-submit')
        fireEvent.click(btnSumbmit)
        expect(container).toBeEmpty()
    })

})
