"use client"
import { Header } from "@/components/Header"
import { MyPokemonsCapture } from "@/components/ui/MyPokemonsCapture"

export default function MyPokemons() {
  return (
    <section className="w-full">
      <div className="w-full bg-[#F8F4F4]">
        <Header />
        <div className="max-w-7xl h-screen mx-auto">
          <MyPokemonsCapture />
        </div>
      </div>
    </section>
  )
}