'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

export const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = useMemo(() => {
    // Use ISO 8601 format for date parsing
    const date = new Date('2024-06-25T00:00:00Z')
    if (isNaN(date.getTime())) {
      //console.error('Invalid date format')
      return new Date() // fallback to current date in case of parsing error
    }
    return date
  }, [])

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date()
      const timeDifference = Math.max(targetDate.getTime() - currentTime.getTime(), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({
        days: isNaN(days) ? 0 : days,
        hours: isNaN(hours) ? 0 : hours,
        minutes: isNaN(minutes) ? 0 : minutes,
        seconds: isNaN(seconds) ? 0 : seconds,
      })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
      }
    }

    const timerInterval = setInterval(updateTimer, 1000)
    updateTimer() // Ensure the timer updates immediately

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [targetDate])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every
          purchase comes with exclusive perks and offers, making this month a celebration of savvy
          choices and amazing deals. Don't miss out! 🎁🛒
        </p>

        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
      <Link className="flex-auto aligns-items-center" href="/cubensis-grow-kits">
        <Image
          className=""
          width={800}
          height={800}
          src={'/media/discount.jpg'}
          alt={'Promotion'}
        />
      </Link>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)
