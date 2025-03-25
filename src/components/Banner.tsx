"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Banner() {
  const covers = ['/img/space.jpg', '/img/space1.jpg', '/img/space2.jpg'];
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();
  return (
    <div
      className="relative w-screen h-[80vh] flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={() => setIndex((index + 1) % covers.length)}
    >
      <Image
        src={covers[index]}
        alt={'Banner background'}
        fill={true}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Where Productivity Meets Comfort</h1>
        <h3 className="text-lg md:text-2xl text-white">Flexible co-working spaces designed for focus, collaboration and growth</h3>
        <button
          className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-800 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/coworkingspace");
          }}
        >
          Explore Co-Working Spaces
        </button>
      </div>
    </div>
  );
}
