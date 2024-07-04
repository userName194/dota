"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import s from "./signUp.module.css";

interface IFormInput {
    email: string;
}

interface IVerifyInput {
    email: string;
    code: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required')
});

const verifySchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    code: yup.string().required('Verification code is required'),
});

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const { register: registerVerify, handleSubmit: handleVerifySubmit, formState: { errors: verifyErrors } } = useForm<IVerifyInput>({
        resolver: yupResolver(verifySchema)
    });

    const [message, setMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            const response = await axios.post('/api/send-verification-email', data);
            if (response.status === 200) {
                setMessage('Verification email sent successfully!');
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while sending the verification email.');
        }
    };

    const onVerifySubmit: SubmitHandler<IVerifyInput> = async data => {
        try {
            const response = await axios.post('/api/verify-email', data);
            if (response.status === 200) {
                setVerifyMessage('Email verified and added to database!');
            } else {
                setVerifyMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            setVerifyMessage('An error occurred while verifying the email.');
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
                <button type="submit">Send Verification Code</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Verify Email</h2>
            <form onSubmit={handleVerifySubmit(onVerifySubmit)}>
                <div>
                    <label htmlFor="code">Verification Code</label>
                    <input id="code" type="text" {...registerVerify('code')} />
                    {verifyErrors.code && <p>{verifyErrors.code.message}</p>}
                </div>
                <button type="submit">Verify Email</button>
            </form>
            {verifyMessage && <p>{verifyMessage}</p>}
        </div>
    );
};
