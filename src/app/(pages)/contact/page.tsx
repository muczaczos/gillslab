// app/contact/page.tsx
import { Metadata } from 'next'

import Contact from './contact'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | Gillslab',
    description:
      'Get in touch with us at Gillslab. We are here to help with all your Cubensis grow kits, spores, and liquid mycelium needs.',
    openGraph: {
      title: 'Contact Us | Gillslab',
      description:
        'Reach out to Gillslab for any inquiries about our products like Cubensis grow kits, spores, and liquid mycelium.',
      url: 'https://gillslab.com/contact',
      images: 'https://gillslab.com/images/contact-us-image.png',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us | Gillslab',
      description: 'Get in touch with Gillslab for any questions about our products.',
      images: 'https://gillslab.com/images/contact-us-image.png',
    },
  }
}

export default function ContactPage() {
  return <Contact />
}
