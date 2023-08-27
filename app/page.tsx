"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import renderTime from './components/renderTime'

const ROUND_DURATION_IN_SECONDS = 15 * 60

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string>("")
  const [playerPoint, setPlayerPoint] = useState<number>(0)
  const [isSelectingResponse, setIsSelectingResponseState] = useState<boolean>(false)
  const [chosenPurposeCategory, setChosenPurposeCategory] = useState<string>("")
  const [chosenAppeal, setChosenAppeal] = useState<string>("")
  const [chosenResponseIndex, setChosenResponseIndex] = useState<string>("")

  return (
    <section className="p-10">
      {/*The image component that will show the slide images*/}
      <Image
        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        alt="Background"
        width="1920"
        height="1080"
        className="absolute top-[200px] right-0 left-0 bottom-[200px] m-auto max-h-screen"
      />

      {/*Circle Timer gotten from amazing package.*/}
      <div className="absolute right-5 top-[70px]">
        <CountdownCircleTimer
          isPlaying
          duration={ROUND_DURATION_IN_SECONDS}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          size={120}
          strokeWidth={7}
          //onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </section>
  )
}
