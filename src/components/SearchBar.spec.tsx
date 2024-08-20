import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const setup = () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    return { onSearch };
  };

  it('should update the input value when typing', () => {
    setup();

    const input = screen.getByPlaceholderText(/search modules/i);
    fireEvent.change(input, { target: { value: 'example query' } });

    expect(input).toHaveValue('example query');
  });

  it('should call onSearch with the correct query when search button is clicked', () => {
    const { onSearch } = setup();

    const input = screen.getByPlaceholderText(/search modules/i);
    fireEvent.change(input, { target: { value: 'example query' } });

    const button = screen.getByText(/search/i);
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('example query');
  });

  it('should call onSearch with an empty string if input is empty', () => {
    const { onSearch } = setup();

    const button = screen.getByText(/search/i);
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('');
  });
});
