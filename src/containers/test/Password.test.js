import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux';
import reducers from "../../store/reducers";
import { Provider } from 'react-redux';
import { getPasswords, getPassword } from '../../store/actions/passsword';
import { GET_PASSWORDS, GET_PASSWORD, ONLOAD_PASSWORDS } from "../../store/actionTypes";
import Password from '../Password';

jest.mock('../../store/actions/passsword');

const passwordsDummy = [
    {
        id: 1,
        url: 'google.com',
        password: 'Google1@',
        username: 'google'
    }
]

describe('renders password', function () {  

    test('renders password list, clicked password list to look detail password', () => {
        const mockedGetPasswords = jest.fn(() => {
            return {
                type: GET_PASSWORDS,
                data: passwordsDummy
            }
        })
        const mockedGetPassword = jest.fn(() => {
            return {
                type: GET_PASSWORD,
                data: passwordsDummy[0]
            }
        })
        const store = createStore(
            reducers,
            {
                password: {
                    passwords: [],
                    password: null,
                    onload_post: false
                }
            },
        )
        
        getPasswords.mockImplementation(mockedGetPasswords)
        getPassword.mockImplementation(mockedGetPassword)
        
        const { debug, getAllByTestId, getByTestId } = render(
                <Provider store={store}>
                    <Router>
                        <Password />
                    </Router>
                </Provider>
            );
        const passwordList = getAllByTestId('passwords-list')
        expect(passwordList.length).toEqual(passwordsDummy.length)
        expect(passwordList[0].children[0].children[0].textContent).toEqual(passwordsDummy[0].url)
        expect(passwordList[0].children[0].children[1]).toHaveTextContent(passwordsDummy[0].username)
        expect(passwordList[0].children[0].children[2]).toHaveTextContent(passwordsDummy[0].password)

        fireEvent.click(getAllByTestId('passwords-list')[0])

        const formInputUrl = getByTestId('form-input-url')
        const formInputUsername = getByTestId('form-input-username')
        const formInputPassword = getByTestId('form-input-password')
        expect(formInputUrl.value).toEqual(passwordsDummy[0].url)
        expect(formInputUsername.value).toEqual(passwordsDummy[0].username)
        expect(formInputPassword.value).toEqual(passwordsDummy[0].password)
    });

    test('renders before load password (Loading...) ', () => {
        const mockedGetPasswords = jest.fn(() => {
            return {
                type: ONLOAD_PASSWORDS
            }
        })
        const store = createStore(
            reducers,
            {
                password: {
                    passwords: [],
                    password: null,
                    onload_post: false
                }
            },
        )
        
        getPasswords.mockImplementation(mockedGetPasswords)

        const { debug, getByText } = render(
                <Provider store={store}>
                    <Router>
                        <Password />
                    </Router>
                </Provider>
            );
        const loading = getByText('Loading...');
        expect(loading).toBeInTheDocument();
    })

    test('renders password list not data', () => {
        const mockedGetPasswords = jest.fn(() => {
            return {
                type: GET_PASSWORDS,
                data: []
            }
        })
        const store = createStore(
            reducers,
            {
                password: {
                    passwords: [],
                    password: null,
                    onload_post: false
                }
            },
        )
        
        getPasswords.mockImplementation(mockedGetPasswords)

        const { debug, getByText } = render(
                <Provider store={store}>
                    <Router>
                        <Password />
                    </Router>
                </Provider>
            );
        const passwordEmpty = getByText('there are\'t passwords');
        expect(passwordEmpty).toBeInTheDocument();
    })
})

