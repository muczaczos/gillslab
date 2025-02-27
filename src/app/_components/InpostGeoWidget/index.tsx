import React, { useCallback, useEffect } from 'react'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    onPoint: any
  }
}

export type InpostGeowidgetProps = {
  token: string
  // eslint-disable-next-line no-unused-vars
  onPoint: (e?: any) => void
  language?: string
  config?: string
}

export const InpostGeoWidget = ({
  token,
  onPoint,
  language = 'pl',
  config = 'parcelCollect',
}: InpostGeowidgetProps): any => {
  const callback = useCallback((e: any) => onPoint(e), [onPoint])

  useEffect(() => {
    const css: HTMLLinkElement = document.createElement('link'),
      js: HTMLScriptElement = document.createElement('script'),
      body: HTMLElement = document.getElementsByTagName('body')[0]

    css.rel = 'stylesheet'
    css.href = 'https://geowidget.inpost.pl/inpost-geowidget.css'
    css.type = 'text/css'

    js.defer = true
    js.src = 'https://geowidget.inpost.pl/inpost-geowidget.js'

    body.appendChild(css)
    body.appendChild(js)
  }, [])

  useEffect(() => {
    window.onPoint = callback
    function afterPointSelected(point) {
      alert('Wybrany punkt: ' + point.name)
      //console.log('dupa')
    }
  }, [callback])

  return React.createElement('inpost-geowidget', {
    token,
    onPoint: 'onPoint',
    language,
    config,
  })
}
