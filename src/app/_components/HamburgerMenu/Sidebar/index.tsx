import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Sidebar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false)

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${process.env.CMS_API_KEY}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await response.json()
        setCategories(data.docs)
      } catch (error) {
        // console.error('Error fetching categories:', error)
      } finally {
      }
    }

    fetchCategories()
  }, [])

  const toggleShopMenu = () => {
    setIsShopOpen(!isShopOpen)
  }

  return (
    <div className="w-5/6 pt-20 px-5 h-full bg-transparent z-50">
      {/* Shop section */}
      <div onClick={toggleShopMenu} className="pt-1 flex items-center justify-between">
        <p
          onClick={toggleShopMenu}
          className="text-customWhite font-semibold text-xl block pb-3 cursor-pointer"
        >
          Shop
        </p>
        <div
          onClick={toggleShopMenu}
          className="text-customWhite font-semibold text-xl pb-3 cursor-pointer bg-transparent"
        >
          {isShopOpen ? '-' : '+'}
        </div>
      </div>
      {isShopOpen && (
        <div className="pl-4">
          {categories
            ?.slice()
            .reverse() //display categories in reverse order
            .map(category => (
              <Link href={`/shop/${category?.slug}` || 'Untitled Category'} key={category?.id}>
                <p className="text-customWhite font-semibold text-lg pb-2 cursor-pointer">
                  {category?.title || 'Untitled Category'}
                </p>
              </Link>
            ))}
        </div>
      )}

      {/* Other sections */}
      <Link href="/contact">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Contact</p>
        </div>
      </Link>
      <Link href="/conditions">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Conditions</p>
        </div>
      </Link>
      <Link href="/privacy">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Privacy</p>
        </div>
      </Link>
      <Link href="/payment">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Payment</p>
        </div>
      </Link>
      <Link href="/shipping">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Shipping</p>
        </div>
      </Link>
      <Link href="/blog">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Blog</p>
        </div>
      </Link>
      <Link href="/vlog">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">Vlog</p>
        </div>
      </Link>
      <Link href="/about">
        <div className="pt-1">
          <p className="text-customWhite font-semibold text-xl block pb-3">About</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
