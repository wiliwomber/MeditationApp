import { useEffect, useState } from "react"
import { playGong } from "../utils"

export const useTimer = () => {
  const [durationInSeconds, setDurationInSeconds] = useState<number>(0)
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  async function startTimer(durationInMinutes: number) {
    setIsTimerRunning(true)
    setDurationInSeconds(durationInMinutes * 60)
    setProgress(0)
    setTimeLeftInSeconds(durationInMinutes * 60)
  }

  async function finishTimer() {
    setDurationInSeconds(0)
    setProgress(1)
    setTimeLeftInSeconds(0)
    playGong()
    // Keep showing the finished progress bat for 5 seconds before resetting
    await setTimeout(() => {
      setIsTimerRunning(false)
    }, 5000);
  }

  // run timer logic
  useEffect(() => {
    if (!isTimerRunning || progress === 1) {
      return
    }

    if (timeLeftInSeconds === 0) {
      finishTimer()
      return
    }

    // save intervalId to clear the interval when the
    const intervalId = setInterval(() => {
      setProgress((1 - (timeLeftInSeconds / durationInSeconds)))
      setTimeLeftInSeconds(timeLeftInSeconds - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeftInSeconds]);

  return { isTimerRunning, timeLeftInSeconds, progress, startTimer }
}