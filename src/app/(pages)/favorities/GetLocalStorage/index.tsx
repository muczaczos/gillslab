'use client'
import React, { useEffect, useState } from 'react'

const GetLocalStorage = ({ setFavoriteSlugs }) => {
  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favorites') || '[]')

    // Set the favorites state to pass to the server component
    setFavoriteSlugs(favorite)

  }, [setFavoriteSlugs])

  return <div></div>
}

export default GetLocalStorage
