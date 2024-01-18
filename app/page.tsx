import Button from '@/library/components/atoms/Button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button text={'Sign in'} handleClick={undefined} />
    </main>
  )
}
