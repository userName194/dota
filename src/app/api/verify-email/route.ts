import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const verificationCodes = new Map<string, string>();

export async function POST(req: NextRequest) {
    const { email, code } = await req.json();

    if (!email || !code) {
        return NextResponse.json({ message: 'Email and code are required' }, { status: 400 });
    }

    const storedCode = verificationCodes.get(email);

    if (storedCode && storedCode === code) {
        try {
            await prisma.verificationCode.create({
                data: {
                    email: email,
                    code: storedCode,
                },
            });

            // Удаляем код из временного хранилища после успешного добавления
            verificationCodes.delete(email);

            return NextResponse.json({ message: 'Email verified and added to database' });
        } catch (error) {
            return NextResponse.json({ message: 'Error adding email to database' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Verification failed' }, { status: 400 });
    }
}
