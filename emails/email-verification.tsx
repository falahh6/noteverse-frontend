import { Button, Img, Tailwind, Text, Container } from '@react-email/components'
import { ExternalLink } from 'lucide-react'
import * as React from 'react'

export default function VerificationEmail({ url }: { url: string }) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      <Container className="font-sans flex flex-row items-center justify-center mt-10 pb-10">
        <Img
          src="https://raw.githubusercontent.com/falahh6/noteverse-frontend/refs/heads/develop/public/noteverse%20logo%20full.png"
          alt="Noteverse logo"
        />
        <Text className="text-lg w-fit pl-4">
          Thank you for signing up. Please verify your email address.
        </Text>
        <Button
          className="ml-4 text-sm bg-gray-800 text-white p-2 px-3 rounded-md mt-3 hover:bg-gray-600 flex flex-row items-baseline w-fit"
          href={'http://' + url}
        >
          <span>Verify Email</span>{' '}
          <ExternalLink className="h-4 w-4 ml-1 -mb-0.5" />
        </Button>
      </Container>
    </Tailwind>
  )
}
