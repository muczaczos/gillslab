'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'
import { HeaderNav } from './Nav'

import classes from './index.module.scss'

export function Header() {
  const [header, setHeader] = useState<HeaderType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadHeader = async () => {
      try {
        const headerData = await fetchHeader()
        setHeader(headerData)
        setError(null) // Wyczyszczenie błędu, jeśli dane zostały załadowane poprawnie
      } catch (error) {
        console.error('Error loading header:', error) // Logujemy szczegóły błędu
        setError('Failed to load header. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadHeader()
  }, [retryCount])

  const handleRetry = () => {
    setLoading(true)
    setRetryCount(prevCount => prevCount + 1)
  }

  if (loading) {
    return <div>Loading...</div> // Możesz użyć spinnera lub innego wskaźnika ładowania
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={handleRetry}>Retry</button> {/* Przycisk ponownej próby */}
      </div>
    )
  }

  if (!header) {
    return <div>No header data available</div> // Wyświetl domyślną treść, jeśli brak danych
  }

  return <HeaderComponent header={header} />
}
