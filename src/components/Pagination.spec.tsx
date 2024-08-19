import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

test('renders pagination component', () => {
  render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('Next')).toBeInTheDocument();
  expect(screen.getByText('Last')).toBeInTheDocument();
});

test('onPageChange is called when page number is clicked', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText('3'));
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('next button works', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText('Next'));
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('previous button works', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={2} totalPages={10} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText('Previous'));
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(1);
});

test('last button works', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText('Last'));
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(10);
});

test('first button works', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByText('First'));
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(1);
});

test('disables previous button on first page', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
  expect(screen.getByText('Previous')).toBeDisabled();
});

test('disables next button on last page', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);
  expect(screen.getByText('Next')).toBeDisabled();
});

test('disables last button on last page', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);
  expect(screen.getByText('Last')).toBeDisabled();
});

test('disables first button on first page', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
  expect(screen.getByText('First')).toBeDisabled();
});
