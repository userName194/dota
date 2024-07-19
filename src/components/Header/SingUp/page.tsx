//dota/src/components/Header/SingUp/page.tsx
"use client";
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import s from "./signUp.module.css";

export default function SignUp() {
    const [message, setMessage] = useState<string>('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const siteKey = process.env.NEXT_PUBLIC_DOTA_CAPTCHA_ID;
    console.log("siteKey", siteKey);

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!captchaToken) {
            setMessage('Please complete the reCAPTCHA');
            return;
        }

        try {
            const response = await fetch('/api/verify-recaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ captchaToken }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Registration successful!');
            } else {
                setMessage('Captcha verification failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred during registration.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required />
                </div>
                <ReCAPTCHA
                    sitekey={siteKey as string}
                    onChange={handleCaptchaChange}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
