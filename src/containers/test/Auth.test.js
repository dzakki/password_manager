import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Auth from '../Auth';

describe('Auth page', () => {

    test('renders login with loggin user', () => {
        const signInWithGoogle = jest.fn()
        const props = {
            user: null,
            signInWithGoogle
        }
    
        const { getByTestId } = render(
            <Auth firebaseAuth={props} />
        );
        
        fireEvent.click(getByTestId('sign-with-google'))
        expect(signInWithGoogle).toHaveBeenCalled()
    });

    test('renders loggin with logged user', () => {
        const signInWithGoogle = jest.fn()
        const props = {
            user: {
                displayName: 'dzakki'
            },
            signInWithGoogle
        }

        const { container } = render(
            <Router>
                <Auth firebaseAuth={props} />
            </Router>
        );
        expect(container).toBeEmpty()
    })
})
