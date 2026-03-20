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
    const { id } = await request.json();
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 });
    }

    const resendClient = getResend();
    if (!resendClient) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
    }

    // Fetch the email resource from Resend by id
    const email = await resendClient.emails.get(id);
    // Also fetch attachments metadata for the email (if any)
    let attachments = null;
    try {
      const atRes = await resendClient.emails.attachments.list({ emailId: id });
      attachments = atRes?.data ?? null;
    } catch (err) {
      console.warn('Failed to fetch attachments for email:', err);
    }

    return NextResponse.json({ success: true, email, attachments });
  } catch (error) {
    console.error('Error fetching resend email status:', error);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
