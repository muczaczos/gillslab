'use client'
import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const GrowkitsCards = ({ pages }) => {
  const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL;
  
  // Stan do przechowywania ulubionych produktów
  const [favorites, setFavorites] = useState([]);

  // Pobieranie ulubionych z localStorage w momencie montowania komponentu
  useEffect(() => {
    if (typeof window !== 'undefined') { // sprawdzenie środowiska
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    }
  }, []);

  // Funkcja do aktualizacji ulubionych
  const toggleFavorite = (slug) => {
    if (favorites.includes(slug)) {
      const updatedFavorites = favorites.filter(favSlug => favSlug !== slug);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, slug];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <section className="mt-10 flex flex-col gap-5 justify-center md:flex-wrap md:flex-row md:justify-between">
      {pages.map((item, index) => {
        if (!item) return null;

        const src = item.meta.image.filename.startsWith('http')
          ? item.meta.image.filename
          : `/media/${item.meta.image.filename}`;

        const href = `/${item.slug}`;
        const title = item.title;
        const price = item.price;

        return (
          <div className="flex justify-center" key={index}>
            <Link href={href}>
              <div className="shadow-xl bg-[rgba(187,204,241,0.1)] border-2 border-solid border-primary rounded-2xl">
                <div className="flex justify-end pt-4 px-4">
                  {/* Warunkowe renderowanie ikony serca */}
                  {favorites.includes(item.slug) ? (
                    <FaHeart
                      className="text-secondary text-4xl cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(item.slug);
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-primary text-4xl cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(item.slug);
                      }}
                    />
                  )}
                </div>
                <div className="px-16 pb-3">
                  <Image alt="Cubensis grow kit" src={src} width={350} height={180} />
                </div>
                <h6 className="pl-5 text-xl text-primary">{title}</h6>
                <p className="pl-5 text-xl pb-4 font-bold text-primary">€{price}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default GrowkitsCards;
