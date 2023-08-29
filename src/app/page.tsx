"use client"
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { PokemonList } from "@/components/pokemon/PokemonList";
import { useCartModal } from "@/stateGlobal/modalCartStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'


export default function Home() {
  const isModal = useCartModal((state) => state.isModal)
  return (
    <section className="w-full">
      <div className="w-full bg-[#F8F4F4]">
        <Header />
        <div className="max-w-7xl h-full mx-auto">
          <PokemonList />
        </div>
      </div>
      <ToastContainer />
      {isModal && <Cart />}
    </section>
  )
}
