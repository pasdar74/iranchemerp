import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders admin preview page', () => {
  render(<App />);
  const title = screen.getByRole('heading', { name: /ورودی ها/i });
  expect(title).toBeInTheDocument();
});
