// app/layouts/with-header-footer/layout.tsx

import React from 'react'

import { Header } from '../../_components/Header' // Ścieżki do komponentów mogą się różnić

export default function LayoutWithNoHeaderAndFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
