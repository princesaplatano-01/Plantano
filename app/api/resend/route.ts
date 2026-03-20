import { Resend } from 'resend';
import { NextResponse } from 'next/server';

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    resend = new Resend(key);
  }
  return resend;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resendClient = getResend();
    if (!resendClient) {
      console.error('Resend client not configured (RESEND_API_KEY missing)');
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 });
    }

    const data = await resendClient.emails.send({
      from: 'Princesa Plátano <hello@princesaplatano.com>',
      to: [email],
      subject: 'Welcome to the community of Princesa Plátano ',
      html: `
        <h1>Welcome to the Inner Circle</h1>
        <p>Thank you for joining our community! Use the code below for 10% off your first purchase:</p>
        <h2 style="color: #FFD700;">PLATANO10</h2>
        <p>We'll notify you when there are new drops.</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
