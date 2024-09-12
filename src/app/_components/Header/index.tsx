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

  useEffect(() => {
    const loadHeader = async () => {
      try {
        const headerData = await fetchHeader()
        setHeader(headerData)
      } catch (error) {
        setError('Failed to load header')
      } finally {
        setLoading(false)
      }
    }

    loadHeader()
  }, [])

  if (loading) {
    return <div>Loading...</div> // Możesz użyć spinnera lub innego wskaźnika ładowania
  }

  if (error) {
    return <div>{error}</div> // Wyświetl błąd w przypadku problemów z ładowaniem
  }

  if (!header) {
    return <div>No header data available</div> // Wyświetl domyślną treść, jeśli brak danych
  }

  return <HeaderComponent header={header} />
}
