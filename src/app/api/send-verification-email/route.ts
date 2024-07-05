import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const verificationCodes = new Map<string, string>();

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const code = uuidv4().split('-')[0];

    const data = {
        sender: { email: process.env.BREVO_SMTP_USER, name: 'Your Company Name' },
        to: [{ email: email }],
        subject: 'Verification Code',
        htmlContent: `<p>Your verification code is ${code}</p>`,
    };

    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            verificationCodes.set(email, code);
            return NextResponse.json({ message: 'Verification email sent successfully!' });
        } else {
            return NextResponse.json({ message: 'Failed to send verification email' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error sending verification email', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error', error: String(error) }, { status: 500 });
        }
    }
}
