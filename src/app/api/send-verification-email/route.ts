import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const brevoSmtpUser = process.env.BREVO_SMTP_USER;
const brevoSmtpPass = process.env.BREVO_SMTP_PASS;
const brevoSmtpHost = process.env.BREVO_SMTP_HOST;

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: Request) {
    console.log('Received request');

    try {
        const { email } = await req.json();

        console.log('Parsed email:', email);

        if (!email) {
            console.log('Email is missing');
            return new NextResponse(JSON.stringify({ message: 'Email is required' }), { status: 400 });
        }

        const code = generateVerificationCode();
        console.log('Generated code:', code);

        console.log('Attempting to store code in database');
        await prisma.verificationCode.create({
            data: {
                email,
                code,
            },
        });

        console.log('Stored code in database');

        // Настройка транспорта
        const transporter = nodemailer.createTransport({
            host: brevoSmtpHost,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: brevoSmtpUser, // ваш SMTP пользователь Brevo
                pass: brevoSmtpPass, // ваш SMTP пароль Brevo
            },
        });

        // Отправка письма
        await transporter.sendMail({
            from: '"Your Name" <your-email@example.com>', // адрес отправителя
            to: email, // адрес получателя
            subject: 'Your Verification Code',
            html: `<p>Your verification code is <strong>${code}</strong></p>`, // HTML тело письма
        });

        console.log('Email sent');

        return new NextResponse(JSON.stringify({ message: 'Verification email sent' }), { status: 200 });
    } catch (error) {
        console.error('Error sending verification email:', error);

        // Приведение типа ошибки к объекту
        if (error instanceof Error) {
            return new NextResponse(JSON.stringify({ message: 'Error sending verification email', error: error.message }), { status: 500 });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Error sending verification email', error: 'Unknown error' }), { status: 500 });
        }
    }
}
