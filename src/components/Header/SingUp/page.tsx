// путь: src/app/components/Header/SignUp/page.tsx

"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from "./signUp.module.css"

interface IFormInput {
    email: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required')
});

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const [message, setMessage] = useState('');

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            const response = await fetch('/api/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Verification email sent successfully!');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while sending the verification email.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <button type="submit">Send message</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
