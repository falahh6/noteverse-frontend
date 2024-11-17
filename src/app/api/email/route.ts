import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import VerificationEmail from '../../../../emails/email-verification'
import React from 'react'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_TOKEN)

export const POST = async (request: NextRequest) => {
  try {
    const { email, subject, url } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    console.log('Email:', email)
    console.log('url:', url)

    if (!url) {
      return NextResponse.json(
        { error: 'Verification ID is required' },
        { status: 400 },
      )
    }

    const emailHtml = await render(
      React.createElement(VerificationEmail, { url: url }),
    )

    const response = await resend.emails.send({
      from: 'Noteverse <noteverse@falah.in>',
      to: [email],
      subject: subject,
      html: emailHtml,
    })

    if (response.error) {
      return NextResponse.json(
        { error: 'Error sending email', message: response.error },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Email sent', data: response.data },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: 'Error sending email' }, { status: 400 })
  }
}
