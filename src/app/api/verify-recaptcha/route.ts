// dota/src/app/api/verify-recaptcha/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface VerifyRecaptchaResponse {
    success: boolean;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<VerifyRecaptchaResponse>
) {
    const { captchaToken } = req.body;

    if (!captchaToken) {
        return res.status(400).json({ success: false, message: 'Captcha token is required' });
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
        return res.status(400).json({ success: false, message: 'Captcha verification failed' });
    }

    res.status(200).json({ success: true, message: 'Captcha verification successful' });
}
