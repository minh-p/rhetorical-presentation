import type { TimeProps } from 'react-countdown-circle-timer'

const formatSecondsToMinuteString = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds}`
}

const renderTime = ({ remainingTime } : TimeProps) => {
  if (remainingTime === 0) {
    return <div className="timer">Time is up!</div>
  }

  return (
    <div className="text-center">
      <div className="color-[#aaa]">Time Left</div>
      <div className="text-4xl">{formatSecondsToMinuteString(remainingTime)}</div>
    </div>
  );
}

export default renderTime
