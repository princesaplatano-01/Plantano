import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!email || typeof email !== 'string' || !message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height:1.6;">
        <h2>New contact message</h2>
        <p><strong>From:</strong> ${name ?? 'Anonymous'} &lt;${email}&gt;</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Princesa Platano <hello@princesaplatano.com>',
      to: ['princesaplatano@gmail.com'],
      reply_to: email,
      subject: `Website contact: ${name ?? email}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
