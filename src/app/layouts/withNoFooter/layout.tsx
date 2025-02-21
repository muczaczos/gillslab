// app/layouts/with-header-footer/layout.tsx

import React from 'react'

export default function LayoutWithNoHeaderAndFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
