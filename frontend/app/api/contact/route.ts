import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  project_type: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0a0a0a; color: #f1f1ea; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #111812; border: 1px solid rgba(32,229,106,0.15); }
    .header { background: #050805; padding: 32px 36px; border-bottom: 1px solid rgba(32,229,106,0.12); }
    .header h1 { margin: 0; font-size: 22px; font-weight: 400; color: #f1f1ea; letter-spacing: 0.05em; }
    .header span { color: #20E56A; }
    .body { padding: 32px 36px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #20E56A; margin-bottom: 6px; display: block; }
    .value { font-size: 14px; color: #f1f1ea; line-height: 1.6; }
    .message-box { background: #0b110c; border: 1px solid rgba(32,229,106,0.1); padding: 16px 20px; border-radius: 2px; }
    .footer { padding: 20px 36px; border-top: 1px solid rgba(32,229,106,0.08); font-size: 11px; color: #59635b; }
    .divider { height: 1px; background: rgba(32,229,106,0.08); margin: 4px 0 20px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact — <span>Nayab.</span></h1>
    </div>
    <div class="body">
      <div class="field">
        <span class="label">From</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <span class="label">Email</span>
        <div class="value"><a href="mailto:${data.email}" style="color:#20E56A;text-decoration:none;">${data.email}</a></div>
      </div>
      ${data.company ? `
      <div class="divider"></div>
      <div class="field">
        <span class="label">Company</span>
        <div class="value">${data.company}</div>
      </div>` : ""}
      <div class="divider"></div>
      <div class="field">
        <span class="label">Project Type</span>
        <div class="value">${data.project_type}</div>
      </div>
      ${data.budget ? `
      <div class="divider"></div>
      <div class="field">
        <span class="label">Budget</span>
        <div class="value">${data.budget}</div>
      </div>` : ""}
      <div class="divider"></div>
      <div class="field">
        <span class="label">Message</span>
        <div class="message-box value">${data.message.replace(/\n/g, "<br/>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent via nayabaslam.com contact form &nbsp;·&nbsp; Reply directly to <a href="mailto:${data.email}" style="color:#20E56A;">${data.email}</a>
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Nayab Portfolio <onboarding@resend.dev>",
      to: "nayabaslam271@gmail.com",
      replyTo: data.email,
      subject: `New message from ${data.name} — ${data.project_type}`,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }
    console.error("Email send error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
