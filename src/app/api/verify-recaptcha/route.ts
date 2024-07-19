import { NextRequest, NextResponse } from 'next/server';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

interface VerifyRecaptchaResponse {
    success: boolean;
    message?: string;
}

export async function POST(req: NextRequest, res: NextResponse<VerifyRecaptchaResponse>) {
    const { captchaToken } = await req.json();
    const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const recaptchaKey = process.env.NEXT_PUBLIC_DOTA_CAPTCHA_ID;

    console.log("Received Captcha Token:", captchaToken);

    if (!captchaToken) {
        return NextResponse.json({ success: false, message: 'Captcha token is required' }, { status: 400 });
    }

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
        console.log("reCAPTCHA Verification Response:", response);

        if (!response.tokenProperties.valid) {
            console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
            return NextResponse.json({ success: false, message: 'Captcha verification failed' }, { status: 400 });
        }

        if (response.tokenProperties.action === 'LOGIN') {
            console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
            response.riskAnalysis.reasons.forEach((reason) => {
                console.log(reason);
            });

            return NextResponse.json({ success: true, message: 'Captcha verification successful' }, { status: 200 });
        } else {
            console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
            return NextResponse.json({ success: false, message: 'Captcha verification failed' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        return NextResponse.json({ success: false, message: 'Captcha verification failed' }, { status: 500 });
    }
}
