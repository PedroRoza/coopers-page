import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, telephone, message } = body

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        message: 'Name, email, and message are required.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // envio de aviso de contato
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'New contact received!',
      html: `
        <h2>New message from website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${telephone || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    }) 

    // email de retorno pelo contato
    await transporter.sendMail({
      from: `"Coopers page" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <p>Hi ${name},</p>
        <p>We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>Thank you for getting in touch. We will get back to you as soon as possible.</p>
        <p>Best regards,<br/>coopers-page send-email</p>
      `,
    })

    return new Response(JSON.stringify({ message: 'Emails sent successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error sending emails:', error)
    return new Response(JSON.stringify({
      message: 'Failed to send emails.',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
