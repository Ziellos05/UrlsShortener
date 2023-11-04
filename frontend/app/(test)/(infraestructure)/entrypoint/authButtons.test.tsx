import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import googleIcon from '@/app/(src)/(infraestructure)/public/7123025_logo_google_g_icon.svg'

import { LogoutButton } from '../../../(src)/(infraestructure)/entrypoints/logoutButton';
import * as react from "next-auth/react";
import { GoogleSingInButton } from "@/app/(src)/(infraestructure)/entrypoints/authButtons";

    // Tests that clicking the button calls signIn function with 'google' as argument
    it("test_click_calls_signin_with_google",() => {
        // Mock the signIn function from 'next-auth/react'
        const signInMock = jest.spyOn(require('next-auth/react'), 'signIn');
        signInMock.mockImplementation(() => {});

        // Render the component using a testing library (like Enzyme or React Testing Library)
        const { getByRole } = render(<GoogleSingInButton />);

        // Simulate a click event on the button
        fireEvent.click(getByRole('button'));

        // Check if the signIn function was called with 'google' as argument
        expect(signInMock).toHaveBeenCalledWith('google');

        // Clean up the mock to ensure tests are completely isolated
        signInMock.mockRestore();
    })

    it('test_button_displays_google_logo', () => {
        // Arrange
        const expectedSrc = googleIcon;
        const expectedAlt = 'Google logo';

        // Act
        const { getByAltText } = render(<GoogleSingInButton />);
        const imageElement = getByAltText(expectedAlt);

        // Assert
        expect(imageElement).toBeInTheDocument();
    });

    it('test_button_has_correct_dimensions', () => {
        const { getByRole } = render(<GoogleSingInButton />);
        const button = getByRole('button');
        expect(button).toHaveStyle('width: 60;');
        expect(button).toHaveStyle('height: 60;');
    });

    it('test_google_sign_in_button_display', () => {
        render(<GoogleSingInButton />);
        const button = screen.getByTestId('logoutButton');
        expect(button).toHaveAttribute('alt', 'Google logo');
    });