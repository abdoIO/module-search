import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { searchModules } from '../api/librariesApi';
import { Module } from '../types';

jest.mock('../api/librariesApi');

const mockedSearchModules = searchModules as jest.MockedFunction<
  typeof searchModules
>;

describe('HomePage', () => {
  beforeEach(() => {
    mockedSearchModules.mockClear();
  });

  it('renders the search bar, module list, and pagination', async () => {
    const mockModules: Module[] = [
      {
        name: 'example-module',
        platform: 'npm',
        repository_url: 'https://github.com/example/example-module',
        stars: 123,
      },
    ];

    mockedSearchModules.mockResolvedValueOnce(mockModules);

    render(<HomePage />);

    const searchBar = screen.getByPlaceholderText(/search modules/i);
    expect(searchBar).toBeInTheDocument();

    fireEvent.change(searchBar, { target: { value: 'example' } });
    fireEvent.click(screen.getByText(/search/i));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const moduleNames = await screen.findAllByText(/example-module/i);
    expect(moduleNames).toHaveLength(2);

    const heading = await screen.findByRole('heading', {
      name: /example-module/i,
    });
    const link = await screen.findByRole('link', {
      name: /https:\/\/github.com\/example\/example-module/i,
    });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays an error message when the API call fails', async () => {
    mockedSearchModules.mockResolvedValueOnce(null);

    render(<HomePage />);

    const searchBar = screen.getByPlaceholderText(/search modules/i);
    fireEvent.change(searchBar, { target: { value: 'example' } });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(
        screen.getByText(/there was an error, please try again/i)
      ).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    const mockModules: Module[] = [
      {
        name: 'example-module',
        platform: 'npm',
        repository_url: 'https://github.com/example/example-module',
        stars: 123,
      },
    ];

    mockedSearchModules.mockResolvedValueOnce(mockModules);

    render(<HomePage />);

    const searchBar = screen.getByPlaceholderText(/search modules/i);
    fireEvent.change(searchBar, { target: { value: 'example' } });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', {
        name: /example-module/i,
      });
      expect(headings).toHaveLength(1);
    });

    const links = screen.getAllByRole('link', {
      name: /https:\/\/github.com\/example\/example-module/i,
    });
    expect(links).toHaveLength(1);

    fireEvent.click(screen.getByText('2'));

    expect(mockedSearchModules).toHaveBeenCalledWith('example', 2);
  });

  it('displays "Loading..." while data is being fetched', async () => {
    mockedSearchModules.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    render(<HomePage />);

    const searchBar = screen.getByPlaceholderText(/search modules/i);
    fireEvent.change(searchBar, { target: { value: 'example' } });
    fireEvent.click(screen.getByText(/search/i));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });
});
