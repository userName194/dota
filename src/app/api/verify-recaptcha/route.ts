// src/app/api/verify-recaptcha/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface VerifyRecaptchaResponse {
    success: boolean;
    message?: string;
}

export async function POST(req: NextRequest) {
    const { captchaToken } = await req.json();

    if (!captchaToken) {
        return NextResponse.json({ success: false, message: 'Captcha token is required' }, { status: 400 });
    }

    const secretKey = process.env.NEXT_PUBLIC_DOTA_CAPTCHA_ID;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${captchaToken}`,
    });

    const data = await response.json();

    if (!data.success) {
        return NextResponse.json({ success: false, message: 'Captcha verification failed' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Captcha verification successful' }, { status: 200 });
}