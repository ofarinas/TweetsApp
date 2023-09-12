import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tweet App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tweets App/i);
  expect(linkElement).toBeInTheDocument();
});

