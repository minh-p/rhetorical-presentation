'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import renderTime from './components/renderTime'
import NextPrevButtons from './components/NextPrevButtons'
import Listbox from './components/Listbox'
import useSWR from 'swr'

const ROUND_DURATION_IN_SECONDS: number =
  Number(process.env.NEXT_PUBLIC_ROUND_DURATION_IN_SECONDS) || 300

const NUMBER_OF_SLIDES: number =
  Number(process.env.NEXT_PUBLIC_NUMBER_OF_SLIDES) || 10

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  /*
  const [imageSrc, setImageSrc] = useState<string>("")
  const [isSelectingResponse, setIsSelectingResponseState] = useState<boolean>(false)
  */

  // States
  const [roundIsActive, setRoundStatusActive] = useState<boolean>(true)
  const [gameHasStarted, setGameStatusStarted] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)
  const [playerPoints] = useState<number>(0)
  const [slideNumber] = useState<number>(1)
  const [chosenResponseIndex, setChosenResponseIndex] = useState<number>(0)
  const [numberOfResponses] = useState<number>(10)
  const [chosenPurposeCategory, setChosenPurposeCategory] =
    useState<string>('none')
  const [chosenAppeal, setChosenAppeal] = useState<string>('none')

  // JSON
  const { data, error } = useSWR('/api/staticdata', fetcher)

  if (error) return <div>Data failed to load</div>
  if (!data) return <div>No Game Data. Sorry!</div>

  const gameData = JSON.parse(data)
  const purposes: string[] = Object.keys(gameData.purposes)
  let appeals: string[] = []

  if (chosenPurposeCategory == 'none') {
    setChosenPurposeCategory(purposes[0])
  } else {
    appeals = Object.keys(gameData.purposes[chosenPurposeCategory])
    if (
      chosenAppeal == 'none' &&
      gameData.purposes[chosenPurposeCategory][appeals[0]]
    ) {
      setChosenAppeal(appeals[0])
    } else if (
      chosenAppeal != 'none' &&
      !gameData.purposes[chosenPurposeCategory][chosenAppeal]
    ) {
      if (gameData.purposes[chosenPurposeCategory][appeals[0]]) {
        setChosenAppeal(appeals[0])
      } else {
        setChosenAppeal('none')
      }
    }
  }

  if (appeals.length == 0) {
    appeals[0] = 'none'
  }

  let topPurpose: string = '-top-[60px]'
  let topAppeal: string = '-top-[60px]'

  // Circumvent the safelisting through a very crude way
  if (purposes.length == 1) {
    topPurpose = '-top-[60px]'
  } else if (purposes.length == 2) {
    topPurpose = '-top-[120px]'
  } else if (purposes.length == 3) {
    topPurpose = '-top-[180px]'
  }

  if (appeals.length == 1) {
    topAppeal = '-top-[108px]'
  } else if (appeals.length == 2) {
    topPurpose = '-top-[120px]'
  } else if (appeals.length == 3) {
    topAppeal = '-top-[180px]'
  }

  return (
    <section className="p-10">
      <div className="absolute top-0 right-0 left-0 bottom-[20vh] m-auto min-h-[70vh] max-h-screen w-screen">
        {/*The image component that will show the slide images*/}
        <div className="max-h-full overflow-clip">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Background"
            width="1920"
            height="1080"
            className="max-w-screen lx:max-w-[1920px] m-auto"
          />
        </div>

        {/*Response Menu*/}
        <div className="hidden sm:flex sm:flex-row space-x-2 m-auto bg-black left-5 text-lx top-10 max-w-[1920px] max-h-[100px]">
          <div className="w-[240px] p-5 bg-white flex flex-row w-[370px] space-x-5 overflow-visible">
            <Listbox
              selected={chosenPurposeCategory}
              setSelected={setChosenPurposeCategory}
              top={topPurpose}
              label="Purpose"
              options={purposes}
            />
            <Listbox
              selected={chosenAppeal}
              setSelected={setChosenAppeal}
              top={topAppeal}
              label="Appeal"
              options={appeals}
            />
          </div>
          <div className="bg-white p-0 lg:p-7 overflow-hidden">
            <NextPrevButtons
              prevFunction={() =>
                setChosenResponseIndex((prevKey) => {
                  if (prevKey > 0) return prevKey - 1
                  return 0
                })
              }
              nextFunction={() =>
                setChosenResponseIndex((prevKey) => {
                  if (prevKey < numberOfResponses) return prevKey + 1
                  return numberOfResponses
                })
              }
            />
          </div>
          <div className="bg-white p-5 grow overflow-y-scroll">
            [{chosenResponseIndex}/{numberOfResponses}] Chosen Response
          </div>

          {/*Reponse Submit Button*/}
          <div className="bg-white p-2 lg:p-7 overflow-hidden">
            <button
              type="button"
              className="max-h-[40px] bg-gray-800 text-white rounded py-2 hover:bg-red-700 hover:text-white px-3 my-6 lg:my-0"
            >
              <div className="flex flex-row align-middle">
                <p>Submit</p>
              </div>
            </button>
          </div>
        </div>

        <div className="hidden sm:block m-auto bg-black p-5 left-5 text-lx top-10 max-w-[1920px]">
          {/*Investors' Reactions*/}
          <p className="text-white">Investor: Ha ha this is ridiculous</p>
          {/*Image's Description */}
          <p className="text-white">Slide&apos;s Description: </p>
        </div>
      </div>

      {/*Timer and Round Functionality*/}
      <div className="hidden sm:block text-center text-amber-300 absolute right-5 top-[70px]">
        <div className="bg-black rounded-full">
          {/*Circle Timer gotten from amazing package.*/}
          <CountdownCircleTimer
            isPlaying={gameHasStarted && roundIsActive}
            key={key}
            duration={ROUND_DURATION_IN_SECONDS}
            colors={['#FCD34D', '#F7B801', '#A30000', '#800080', '#000000']}
            colorsTime={[
              ROUND_DURATION_IN_SECONDS,
              ROUND_DURATION_IN_SECONDS / 2,
              ROUND_DURATION_IN_SECONDS / 4,
              ROUND_DURATION_IN_SECONDS / 8,
              0,
            ]}
            trailColor={'#000000'}
            size={120}
            strokeWidth={6}
            onComplete={() => {
              setRoundStatusActive(false)
            }}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        {/*Button to end or restart the round.*/}
        <button
          className="text-amber-300 my-2 py-2.5 px-2.5 ring-2 ring-[#FCD34D] mb-2 text-sm font-bold focus:outline-none bg-black border border-black border-2 rounded"
          onClick={() => {
            if (!gameHasStarted) {
              setGameStatusStarted(true)
              return
            }
            setRoundStatusActive(!roundIsActive)
            setKey((prevKey) => prevKey + 1)
          }}
        >
          {gameHasStarted
            ? roundIsActive
              ? 'Stop Round'
              : 'Restart Round'
            : 'Start Game'}
        </button>
      </div>

      {/*Player Stats Display*/}
      <div className="hidden sm:block absolute flex flex-col space-y-1 right-7 top-[270px]">
        <div className="text-center text-amber-300 text-sm focus:outline-none font-bold bg-black p-2.5 rounded">
          <p>Points: {playerPoints}</p>
        </div>

        {/*Slide#*/}
        <div className="text-center text-amber-300 text-sm focus:outline-none font-bold bg-black p-2.5 rounded">
          <p>
            Slide: {slideNumber}/{NUMBER_OF_SLIDES}
          </p>
        </div>
      </div>
    </section>
  )
}
