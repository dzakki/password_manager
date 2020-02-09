import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";
import SidebarPassword from '../Sidebar.jsx';

describe('Render Sidebar password', () => {

    test('Clicked sidebar password', () => {
        const history = createBrowserHistory()
        const { getByTestId } = render(
            <Router history={history}>
                <SidebarPassword />
            </Router>
        );
        fireEvent.click(getByTestId('add-password'));
        expect(history.location.pathname).toBe('/passwords/add');
    });
})
