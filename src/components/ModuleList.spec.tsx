import React from 'react';
import { render, screen } from '@testing-library/react';
import ModuleList from './ModuleList';
import { Module } from '../types';

const mockModules: Module[] = [
  {
    name: 'example-module',
    platform: 'npm',
    repository_url: 'https://github.com/example/example-module',
    stars: 123,
  },
];

describe('ModuleList', () => {
  it('should render a list of modules', () => {
    render(<ModuleList modules={mockModules} />);

    const moduleNames = screen.getAllByText(/example-module/i);
    expect(moduleNames).toHaveLength(2);

    const heading = screen.getByRole('heading', { name: /example-module/i });
    const link = screen.getByRole('link', {
      name: /https:\/\/github.com\/example\/example-module/i,
    });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
