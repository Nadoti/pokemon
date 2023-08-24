"use client"
import Image from "next/image"
import { Fragment, useEffect } from "react"

const arrayPokemon = [
    {
      id: 1,
      name: "Bulbasaur",
      type: [
        {
          name: "grass"
        },
        {
          name: "poison"
        },
      ],
      generation: "generation-i",
      color: "green",
    },
    {
        id: 1,
        name: "Bulbasaur",
        type: [
          {
            name: "grass"
          },
          {
            name: "poison"
          },
        ],
        generation: "generation-i",
        color: "green",
      },
      {
        id: 1,
        name: "Bulbasaur",
        type: [
          {
            name: "grass"
          },
          {
            name: "poison"
          },
        ],
        generation: "generation-i",
        color: "green",
      },
    {
        id: 1,
        name: "Bulbasaur",
        type: [
            {
            name: "grass"
            },
            {
            name: "poison"
            },
        ],
        generation: "generation-i",
        color: "green",
    },
  ]

export function Cart() {

    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    return (
        <section className="block absolute inset-0 bg-slate-950 bg-opacity-50">
            <aside className="w-full relative max-w-lg h-full z-10 bg-white">
                <button className="w-12 h-12 absolute top-0 right-0 border-2 border-red-500 text-red-500 font-bold rounded-s-md transition-all hover:text-white hover:bg-red-500">X</button>
                <div className="h-full flex flex-col justify-between">
                    <div className="text-center pt-10 mb-5">
                        <h1 className="text-3xl text-gray-700">Lista de Pokemons</h1>
                    </div>
                    <div className="flex flex-col gap-5 overflow-y-scroll flex-1 px-2">
                        {arrayPokemon.map((pokemon, index) => (
                            <div 
                                key={index}
                                className={`border rounded-lg flex items-center justify-between px-4`}
                                style={{background: pokemon.color}}
                            >
                                <div className="relative w-20 h-20 max-w-full">
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                        alt={pokemon.name}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-full mx-auto flex items-center justify-center"
                                        loading="lazy"
                                        priority={false}
                                        placeholder="empty"
                                        fill
                                    />
                                </div>
                                <div>
                                    <h2 className=" text-xl">{pokemon.name}</h2>
                                </div>
                                <ul>
                                    {pokemon.type.map((type, i) => (
                                        <li key={i}>{type.name}</li>
                                    ))}
                                </ul>
                                <div className="">
                                    <p>{pokemon.generation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-2 mt-5 pb-5">
                        <button className="w-full bg-gray-500 text-white py-4 font-bold rounded-md">
                            Capture
                        </button>
                    </div>
                </div>
            </aside>
        </section>
    )
}