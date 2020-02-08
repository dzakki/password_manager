import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const { getByText, debug } = render(<App />);
  const passwordManager = getByText('Password manager');
  expect(passwordManager).toBeInTheDocument();
});
