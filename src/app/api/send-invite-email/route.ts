import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Branded HTML email template
function buildInviteEmail(fullName: string, inviteLink: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You're invited to Be a Better Brand</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f1ea;font-family:'Georgia',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f1ea;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(160deg,#1e0a4a,#2d1260);border-radius:16px 16px 0 0;padding:40px 48px;text-align:center;">
            <img src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
              alt="Be a Better Brand" width="160" style="max-width:160px;height:auto;display:block;margin:0 auto 16px;" />
            <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,0.7);font-family:Georgia,serif;">
              Command Center Access
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:48px;border-left:1px solid rgba(201,168,76,0.2);border-right:1px solid rgba(201,168,76,0.2);">
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:300;color:#1e0a4a;font-family:Georgia,serif;line-height:1.3;">
              You&rsquo;re invited to the<br/>
              <em style="font-style:italic;color:#a07830;">Be a Better Brand Command Center</em>
            </h1>
            <p style="margin:0 0 16px;font-size:16px;color:#5a4070;line-height:1.8;font-family:Georgia,serif;">
              Hi ${fullName},
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#5a4070;line-height:1.8;">
              Chrissy Bernal has invited you to access the Be a Better Brand Command Center —
              your dedicated portal for client projects, campaigns, deliverables, and communication.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#5a4070;line-height:1.8;">
              Click the button below to set your password and activate your account.
            </p>
            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 36px;">
              <tr>
                <td style="border-radius:10px;background:linear-gradient(135deg,#c9a84c,#e8c97a);">
                  <a href="${inviteLink}"
                    style="display:inline-block;padding:16px 40px;font-size:16px;font-weight:700;color:#1e0a4a;text-decoration:none;font-family:Georgia,serif;letter-spacing:0.3px;">
                    Activate Your Account &rarr;
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-size:13px;color:#9a8aaa;line-height:1.6;">
              Or copy and paste this link into your browser:
            </p>
            <p style="margin:0 0 32px;font-size:12px;color:#9a8aaa;word-break:break-all;font-family:monospace;">
              ${inviteLink}
            </p>
            <hr style="border:none;border-top:1px solid rgba(201,168,76,0.2);margin:0 0 28px;" />
            <p style="margin:0;font-size:13px;color:#9a8aaa;line-height:1.6;">
              This invitation link expires in 24 hours. If you didn&rsquo;t expect this invitation,
              you can safely ignore this email.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#1e0a4a;border-radius:0 0 16px 16px;padding:28px 48px;text-align:center;">
            <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:14px;font-style:italic;color:rgba(240,195,112,0.7);">
              Be a Better Brand
            </p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1px;text-transform:uppercase;">
              Magnetic Brand Architecture &middot; Marketing &amp; PR
            </p>
            <p style="margin:12px 0 0;">
              <a href="https://be-a-better-brand.vercel.app" style="font-size:11px;color:rgba(201,168,76,0.5);text-decoration:none;">
                be-a-better-brand.vercel.app
              </a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const { email, full_name, role } = await request.json()

    if (!email || !full_name || !role) {
      return NextResponse.json({ error: 'email, full_name, and role are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Send the Supabase invite (this sends their default email)
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { full_name, role },
      redirectTo: 'https://be-a-better-brand.vercel.app/auth/update-password',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // If Resend is configured, also send a branded email
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && resendKey !== 're_placeholder' && data.user) {
      // Get the invite link from the user object
      const inviteLink = `https://be-a-better-brand.vercel.app/auth/update-password`
      const html = buildInviteEmail(full_name, inviteLink)

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Be a Better Brand <noreply@beabetterbrand.com>',
          to: email,
          subject: 'You\'re invited to the Be a Better Brand Command Center',
          html,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Invite error:', err)
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
  }
}
