"use client"
import { Header } from "@/components/Header"
import { MyPokemonsCapture } from "@/components/ui/MyPokemonsCapture"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from "@/components/Cart";
import { useCartModal } from "@/stateGlobal/modalCartStore";

export default function MyPokemons() {
  const isModal = useCartModal((state) => state.isModal)
  return (
    <section className="w-full sm:h-screen relative">
      <div className="w-full bg-[#F8F4F4] h-full">
        <Header />
        <div className="max-w-7xl mx-auto">
          <MyPokemonsCapture />
        </div>
      </div>
      {isModal && <Cart />}
      <ToastContainer />
    </section>
  )
}