import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    // Build an absolute, URL-encoded image URL so email clients can fetch it
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/,'') )
      || (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
      || 'https://princesaplatano.com';

    const imageFileName = 'DSC07548_72y 3.jpg';
    const imageUrl = `${siteUrl}/SCROLL/${encodeURIComponent(imageFileName)}`;

    // Read the image from `public` and prepare a base64 data URI so the
    // image is embedded directly in the HTML (not sent as a separate attachment).
    const imagePath = path.join(process.cwd(), 'public', 'SCROLL', imageFileName);
    let imageDataUri: string | null = null;
    try {
      const fileBuffer = fs.readFileSync(imagePath);
      const base64 = fileBuffer.toString('base64');
      imageDataUri = `data:image/jpeg;base64,${base64}`;
    } catch (err) {
      console.warn('Could not read inline image for email:', err);
      // fallback to public URL (if available)
      imageDataUri = `${imageUrl}`;
    }

    // 1. Send the Welcome Email
    const resendClient = getResend();
    if (!resendClient) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
    }

    const sendResult = await resendClient.emails.send({
      from: 'Princesa Plátano <hello@princesaplatano.com>',
      to: [email],
      subject: 'Welcome to the world of Princesa Plátano',
      html: `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <h1 style="font-size: 24px; font-weight: normal; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 30px;">Hi there,</h1>
      
      <p style="margin-bottom: 20px;">We are so happy to have you here!</p>
      
      <p style="margin-bottom: 20px;">
        Thank you for joining the <strong>Princesa Plátano</strong> mailing list. This is your backstage pass to our creative world—where we transform raw inspiration into wearable art.
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
      <p style="font-weight: bold;">Princesa Plátano</p>
      <div style="text-align:center; margin-top:12px;">
        <img src="${imageDataUri}" alt="Princesa Plátano" style="width:100%; max-width:100%; height:auto; display:block; margin:8px 0 0; border-radius:4px;" />
      </div>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 28px 0 20px 0;" />

      <div style="text-align: center; font-size: 12px; color: #999;">
        <a href="https://princesaplatano.com" style="color: #999; text-decoration: none; margin: 0 10px;">Website</a>
        <a href="https://www.instagram.com/princesa.platano?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" style="color: #999; text-decoration: none; margin: 0 10px;">Instagram</a>
      </div>
    </div>
    
  `,
      // no attachments: image embedded via data URI to ensure it displays
    });

    // Log the send id and headers explicitly — the SDK response may include
    // non-enumerable or proxied properties that print as `{}` in some runtimes.
    const sendId = (sendResult as any)?.data?.id ?? null;
    const sendHeaders = (sendResult as any)?.headers ?? null;
    console.log('Resend send result id:', sendId, 'headers:', sendHeaders ?? JSON.stringify(sendResult));

    // 2. Add to your Audience (Contact List)
    await resendClient.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    console.log(`Successfully subscribed: ${email}`);
    return NextResponse.json({ success: true, sendResult });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
