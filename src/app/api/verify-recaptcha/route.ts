import { NextRequest, NextResponse } from 'next/server';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

interface VerifyRecaptchaResponse {
    success: boolean;
    message?: string;
}

export async function POST(req: NextRequest) {
    const { captchaToken } = await req.json() as { captchaToken: string };

    if (!captchaToken) {
        return NextResponse.json({ success: false, message: 'Captcha token is required' }, { status: 400 });
    }

    const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID!;
    const recaptchaKey = process.env.NEXT_PUBLIC_DOTA_CAPTCHA_ID!;

    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    const request = {
        assessment: {
            event: {
                token: captchaToken,
                siteKey: recaptchaKey,
            },
        },
        parent: projectPath,
    };

    try {
        const [response] = await client.createAssessment(request);

        // Ensure response and response.tokenProperties are defined
        if (!response || !response.tokenProperties) {
            return NextResponse.json({ success: false, message: 'No token properties found in response' }, { status: 400 });
        }

        if (!response.tokenProperties.valid) {
            return NextResponse.json({ success: false, message: `Invalid captcha token: ${response.tokenProperties.invalidReason}` }, { status: 400 });
        }

        if (response.tokenProperties.action === 'LOGIN') {
            return NextResponse.json({ success: true, message: 'Captcha verification successful' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        return NextResponse.json({ success: false, message: 'Captcha verification failed' }, { status: 500 });
    }
}
