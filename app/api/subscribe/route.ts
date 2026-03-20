import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1. Send the Welcome Email
    await resend.emails.send({
      from: 'Princesa Platano <hello@princesaplatano.com>',
      to: [email],
      subject: 'Welcome to the world of Princesa Platano',
      html: `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <h1 style="font-size: 24px; font-weight: normal; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 30px;">Hi there,</h1>
      
      <p style="margin-bottom: 20px;">We are so happy to have you here!</p>
      
      <p style="margin-bottom: 20px;">
        Thank you for joining the <strong>Princesa Platano</strong> mailing list. This is your backstage pass to our creative world—where we transform raw inspiration into wearable art.
      </p>

      <div style="background-color: #fcfcfc; border: 1px solid #eee; padding: 40px; text-align: center; margin: 40px 0;">
        <p style="text-transform: uppercase; font-size: 11px; letter-spacing: 2px; margin-bottom: 10px; color: #666;">A welcome gift for you</p>
        <p style="font-size: 16px; margin-bottom: 15px;">Enjoy 10% off your very first purchase with the code:</p>
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; display: inline-block; padding: 10px 20px; border: 1px solid #1a1a1a;">PLATANO10</span>
      </div>

      <p style="margin-bottom: 20px;">
        Instead of constant emails, we’ll only reach out to notify you when there are <strong>new drops</strong> or limited edition releases.
      </p>
      
      <p style="margin-bottom: 40px;">
        By being on this list, you’ll be the first to get access to our new collections before they are announced anywhere else.
      </p>

      <p style="margin-bottom: 5px;">Warmly,</p>
      <p style="font-weight: bold;">Princesa Platano</p>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 50px 0 20px 0;" />
      
      <div style="text-align: center; font-size: 12px; color: #999;">
        <a href="https://princesaplatano.com" style="color: #999; text-decoration: none; margin: 0 10px;">Website</a>
        <a href="https://instagram.com/your-handle" style="color: #999; text-decoration: none; margin: 0 10px;">Instagram</a>
      </div>
    </div>
    <div style="text-align:center; margin-top:20px;">
      <img src="/SCROLL/DSC07548_72y%203.jpg" alt="Princesa Platano" style="max-width:100%; height:auto; display:block; margin:0 auto;" />
    </div>
  `,
    });

    // 2. Add to your Audience (Contact List)
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    console.log(`Successfully subscribed: ${email}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
