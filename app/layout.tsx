import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Investors Rhetorical Presentation',
  description:
    'Fun Argument Purposes and Appeals Game. AP Lang Summer Rhetorical Project Submission',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="sm:hidden text-center absolute p-5 left-0 w-screen top-0 bg-[#f1f5f8]">
          <h1>
            This experience is best suited for a larger screen: laptop, desktop,
            or tablet. Please switch your device.
          </h1>
        </div>
        <div className="hidden sm:block text-center absolute p-2 left-0 w-screen top-0 bg-[#f1f5f8]">
          <h1>AP Lang: The Investors Rhetorical Presentation</h1>
        </div>
        <div className="hidden xl:block text-center absolute p-2 left-0 top-0">
          <p>© Vu Huy Minh Pham. All Rights Reserved. </p>
        </div>
        <div className="hidden 2xl:block text-center absolute p-2 right-0 top-0">
          <p>
            (School){' '}
            <Link href="mailto:25hpham4@ggusd.net">25hpham4@ggusd.net</Link>,
            (Personal){' '}
            <Link href="mailto:vhuyminp@gmail.com">vhuyminp@gmail.com</Link>
          </p>
        </div>
        <div className="hidden xl:block 2xl:hidden text-center absolute p-2 right-0 top-0">
          <p>
            <Link href="mailto:25hpham4@ggusd.net">25hpham4@ggusd.net</Link>,{' '}
            <Link href="mailto:vhuyminp@gmail.com">vhuyminp@gmail.com</Link>
          </p>
        </div>
        <footer className="sm:hidden text-center absolute w-screen bottom-0 left-0 p-3 bg-[#f1f5f8]">
          <p>© Vu Huy Minh Pham. All Rights Reserved</p>
          <p>
            Email (School):{' '}
            <Link href="mailto:25hpham4@ggusd.net">25hpham4@ggusd.net</Link>
          </p>
          <p>
            Email (Personal):{' '}
            <Link href="mailto:vhuyminp@gmail.com">vhuyminp@gmail.com</Link>
          </p>
        </footer>
        <footer className="hidden sm:block xl:hidden text-center absolute w-screen bottom-0 left-0 p-3 bg-[#f1f5f8]">
          <p>© Vu Huy Minh Pham. All Rights Reserved</p>
          <p>
            Emails: (School){' '}
            <Link href="mailto:25hpham4@ggusd.net">25hpham4@ggusd.net</Link>,
            (Personal):{' '}
            <Link href="mailto:vhuyminp@gmail.com">vhuyminp@gmail.com</Link>
          </p>
        </footer>
      </body>
    </html>
  )
}
