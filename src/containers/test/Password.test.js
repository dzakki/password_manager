import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import reducers from "../../store/reducers";
import { Provider } from 'react-redux';
import { getPasswords } from '../../store/actions/passsword';
import { GET_PASSWORDS } from "../../store/actionTypes";
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
test('renders app', () => {

    const mockedGetPasswords = jest.fn(() => {
        return {
            type: 'GET_PASSWORDS',
            data: passwordsDummy
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

    const { debug } = render(
            <Provider store={store}>
                <Password />
            </Provider>
        );
    debug()
});
