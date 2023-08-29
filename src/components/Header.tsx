'use client'
import Image from "next/image";
import logo from '../../public/pokeball.svg'
import { useCartModal } from "@/stateGlobal/modalCartStore";
import Link from "next/link"

export function Header() {
    const openCartModal = useCartModal((state) => state.openCartModal)
    return (
        <header className="w-full px-4 bg-[#F8F4F4] shadow-md shadow-gray-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
                <Link href={"/"}>
                    Pokemon
                </Link>
                <div className="flex items-center gap-10">
                    <div>
                        <Link href={"/my-pokemons"} className="hover:underline">
                            My List Pokemon
                        </Link>
                    </div>
                   <button onClick={() => openCartModal()}>
                        <Image width={40} src={logo} alt="Pokebola"/>
                   </button>
                </div>
            </div>
        </header>
    )
}