'use client'
import React, { useEffect, useState } from 'react'

import { Footer as FooterType } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

export function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footerData = await fetchFooter()
        setFooter(footerData)
      } catch (error) {
        setError('Failed to load footer')
      } finally {
        setLoading(false)
      }
    }

    loadFooter()
  }, [])

  if (loading) {
    return <div>Loading...</div> // Możesz użyć spinnera lub innego wskaźnika ładowania
  }

  if (error) {
    return <div>{error}</div> // Wyświetl błąd w przypadku problemów z ładowaniem
  }

  if (!footer) {
    return <div>No footer data available</div> // Wyświetl domyślną treść, jeśli brak danych
  }

  return <FooterComponent footer={footer} />
}
