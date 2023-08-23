"use client"
import { useEffect } from "react"

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
      generation: "generation-i"
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
        generation: "generation-i"
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
        generation: "generation-i"
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
        generation: "generation-i"
    },
  ]

export function Cart() {

    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    return (
        <section className="block absolute inset-0 w-full min-h-screen bg-slate-950 bg-opacity-50 no-scrollbar-container overflow-hidden">
            <aside className="w-full max-w-lg h-full bg-white overflow-hidden ">
                
            </aside>
        </section>
    )
}