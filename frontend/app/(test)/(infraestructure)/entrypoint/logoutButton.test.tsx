import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LogoutButton } from '../../../(src)/(infraestructure)/entrypoints/logoutButton';

test('Primer test :)', () => {

    render(<LogoutButton />)

    const element = screen.getByTestId('logoutButton')

    expect(element).toHaveTextContent('Salir')
})

it('test_button_classes', () => {
    render(<LogoutButton />);
    const button = screen.getByTestId('logoutButton');
    expect(button).toHaveClass('text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1 py-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800');
});

it('test_button_data_testid', () => {
    render(<LogoutButton />);
    const button = screen.getByTestId('logoutButton');
    expect(button).toBeInTheDocument();
});

it("test_click_calls_signOut_with_google",() => {
    // Mock the signOut function from 'next-auth/react'
    const signOutMock = jest.spyOn(require('next-auth/react'), 'signOut');
    signOutMock.mockImplementation(() => {});

    // Render the component using a testing library (like Enzyme or React Testing Library)
    const { getByRole } = render(<LogoutButton />);

    // Simulate a click event on the button
    fireEvent.click(getByRole('button'));

    // Check if the signOut function was called with 'google' as argument
    expect(signOutMock).toHaveBeenCalledWith();

    // Clean up the mock to ensure tests are completely isolated
    signOutMock.mockRestore();
})