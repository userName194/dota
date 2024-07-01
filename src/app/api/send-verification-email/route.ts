import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const verificationCodes = new Map(); // Временное хранилище для верификационных кодов

async function sendVerificationEmail(email: string) {
    const code = uuidv4().split('-')[0]; // Генерация короткого уникального кода

    // Отправка email с помощью Brevo или другого сервиса
    const transporter = nodemailer.createTransport({
        service: 'Brevo', // Настроить под нужный сервис
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is ${code}`,
    };

    await transporter.sendMail(mailOptions);

    // Сохранение кода в временном хранилище
    verificationCodes.set(email, code);

    console.log(`Verification code ${code} sent to ${email}`);
}