'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import renderTime from './components/renderTime'

const ROUND_DURATION_IN_SECONDS = process.env.ROUND_DURATION_IN_SECONDS
  ? parseInt(process.env.ROUND_DURATION_IN_SECONDS)
  : 900

export default function Home() {
  /*
  const [imageSrc, setImageSrc] = useState<string>("")
  const [playerPoint, setPlayerPoint] = useState<number>(0)
  const [isSelectingResponse, setIsSelectingResponseState] = useState<boolean>(false)
  const [chosenPurposeCategory, setChosenPurposeCategory] = useState<string>("")
  const [chosenAppeal, setChosenAppeal] = useState<string>("")
  const [chosenResponseIndex, setChosenResponseIndex] = useState<string>("")
  */
  const [roundIsActive, setRoundStatusActive] = useState<boolean>(true)
  const [key, setKey] = useState<number>(0)

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

      <div className="text-center absolute right-5 top-[70px]">
        {/*Circle Timer gotten from amazing package.*/}
        <CountdownCircleTimer
          isPlaying
          key={key}
          duration={roundIsActive ? ROUND_DURATION_IN_SECONDS - 1 : 0}
          initialRemainingTime={ROUND_DURATION_IN_SECONDS - 1}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 6, 3, 0]}
          size={120}
          strokeWidth={7}
          onComplete={() => {
            setRoundStatusActive(false)
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
        {/*Button to end or restart the round.*/}
        <button
          className="my-2 py-2.5 px-2.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray border border-black border-2 hover:bg-gray-100 rounded opacity-80"
          onClick={() => {
            setRoundStatusActive(!roundIsActive)
            setKey((prevKey) => prevKey + 1)
          }}
        >
          {roundIsActive ? 'Stop Round' : 'Restart Round'}
        </button>
      </div>
    </section>
  )
}
