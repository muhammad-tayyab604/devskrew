// app/api/contact/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  const body = await req.json();

  const {
    name, email, company, service, budget, message
  } = body;

  try {
    const result = await resend.emails.send({
      from: 'Contact Form <contact@devskrew.com>',
      to: 'tali6443@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h3>New message from your website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message
    }, { status: 500 });
  }
}
