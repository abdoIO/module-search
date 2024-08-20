import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const setup = (currentPage: number, totalPages: number) => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };

  it('should render the correct number of page buttons', () => {
    setup(1, 5);

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);
  });

  it('should highlight the active page', () => {
    setup(3, 5);

    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass('active');
  });

  it('should call onPageChange with the correct page number when a page button is clicked', () => {
    const { onPageChange } = setup(1, 5);

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
