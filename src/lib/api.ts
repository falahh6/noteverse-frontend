export const SendVerificationEmail = async (
  email: string,
  subject: string,
  url: string,
) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, url }),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Error sending email')
    }
  } catch (error) {
    return { error: 'Error sending email' }
  }
}
