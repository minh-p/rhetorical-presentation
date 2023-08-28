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

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  // States
  const [roundIsActive, setRoundStatusActive] = useState<boolean>(true)
  const [gameHasStarted, setGameStatusStarted] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)
  const [playerPoints, setPlayerPoints] = useState<number>(0)
  const [slideNumber, setSlides] = useState<number>(0)
  const [chosenResponseIndex, setChosenResponseIndex] = useState<number>(0)
  const [numberOfResponses, setNumberOfResponses] = useState<number>(0)
  const [chosenPurposeCategory, setChosenPurposeCategory] =
    useState<string>('none')
  const [chosenAppeal, setChosenAppeal] = useState<string>('none')
  const [imageSrc, setImageSrc] = useState<string>('')
  const [chosenResponse, setChosenResponse] = useState<string>('')
  const [slideDescription, setSlideDescription] = useState<string>('')

  // JSON Game Data Responses
  const responses = useSWR('/api/staticdata/responses', fetcher)
  // JSON Game Data Slides (Images and Descriptions)
  const slides = useSWR('/api/staticdata/slides', fetcher)

  if (responses.error) return <div>Data (responses) failed to load</div>
  if (!responses.data) return <div>No (responses) Game Data. Sorry!</div>

  if (slides.error) return <div>Data (slides) failed to load</div>
  if (!slides.data) return <div>No Game Data (slides). Sorry!</div>

  const gameResponses = JSON.parse(responses.data)
  const purposes: string[] = Object.keys(gameResponses.purposes)
  let appeals: string[] = []

  if (!gameResponses.purposes[chosenPurposeCategory]) {
    setChosenPurposeCategory(purposes[0])
  } else {
    appeals = Object.keys(gameResponses.purposes[chosenPurposeCategory])
    if (
      chosenAppeal == 'none' &&
      gameResponses.purposes[chosenPurposeCategory][appeals[0]]
    ) {
      setChosenAppeal(appeals[0])
    } else if (
      chosenAppeal != 'none' &&
      !gameResponses.purposes[chosenPurposeCategory][chosenAppeal]
    ) {
      if (gameResponses.purposes[chosenPurposeCategory][appeals[0]]) {
        setChosenAppeal(appeals[0])
      } else {
        setChosenAppeal('none')
      }
    }
  }

  if (
    gameResponses.purposes[chosenPurposeCategory] &&
    gameResponses.purposes[chosenPurposeCategory][chosenAppeal]
  ) {
    if (
      numberOfResponses !=
      gameResponses.purposes[chosenPurposeCategory][chosenAppeal].length
    ) {
      setNumberOfResponses(
        gameResponses.purposes[chosenPurposeCategory][chosenAppeal].length
      )
    }
  } else if (numberOfResponses != 0) {
    setNumberOfResponses(0)
  }

  const gameSlides = JSON.parse(slides.data)

  if (imageSrc == '' && (!roundIsActive || !gameHasStarted)) {
    setImageSrc(gameSlides.defaultImage)
  }

  if (
    slideNumber == 0 &&
    roundIsActive &&
    gameHasStarted &&
    imageSrc != gameSlides.slides[slideNumber][0]
  ) {
    setImageSrc(gameSlides.slides[slideNumber][0])
    setSlideDescription(gameSlides.slides[slideNumber][1])
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

  if (
    gameResponses.purposes[chosenPurposeCategory] &&
    gameResponses.purposes[chosenPurposeCategory][chosenAppeal]
  ) {
    if (chosenResponse == '') {
      setChosenResponse(
        gameResponses.purposes[chosenPurposeCategory][chosenAppeal][
          chosenResponseIndex
        ]
      )
    } else if (
      chosenResponse != '' &&
      chosenResponse !=
        gameResponses.purposes[chosenPurposeCategory][chosenAppeal][
          chosenResponseIndex
        ]
    ) {
      setChosenResponseIndex(0)
    }
  }

  const resetStats = () => {
    // Restart Player Stats
    setPlayerPoints(0)
    setSlides(0)
    setChosenResponseIndex(0)
    setNumberOfResponses(0)
    setChosenAppeal('none')
    setChosenResponse('')
    setChosenPurposeCategory('none')
  }

  return (
    <section className="p-10">
      <div className="absolute top-0 right-0 left-0 bottom-[20vh] m-auto min-h-[70vh] max-h-screen w-screen">
        {/*The image component that will show the slide images*/}
        <div className="max-h-full overflow-clip">
          <Image
            src={imageSrc}
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
                  if (prevKey < numberOfResponses - 1) return prevKey + 1
                  return numberOfResponses - 1
                })
              }
            />
          </div>
          <div className="bg-white p-5 grow overflow-y-scroll overflow-x-scroll">
            [{numberOfResponses > 0 ? chosenResponseIndex + 1 : 0}/
            {numberOfResponses}] Chosen Response
            <br />
            {chosenResponse}
          </div>

          {/*Reponse Submit Button*/}
          <div className="bg-white p-2 lg:p-7 overflow-hidden">
            <button
              type="button"
              className="max-h-[40px] bg-gray-800 text-white rounded py-2 hover:bg-red-700 hover:text-white px-3 my-6 lg:my-0"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="hidden sm:block m-auto bg-black p-5 left-5 text-lx top-10 max-w-[1920px]">
          {/*Investors' Reactions*/}
          <p className="text-white">Investor: Ha ha this is ridiculous</p>
          {/*Image's Description */}
          <p className="text-white">
            Slide&apos;s Description: {slideDescription}
          </p>
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
            if (!roundIsActive) resetStats()
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
            Slide: {slideNumber + 1}/{gameSlides.numberOfSlides}
          </p>
        </div>
      </div>
    </section>
  )
}
