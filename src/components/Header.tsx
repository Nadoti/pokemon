'use client'
import Image from "next/image";
import logo from '../../public/pokeball.svg'
import { useState } from "react";
import { SearchButton } from "./ui/Search";


export function Header() {
    return (
        <header className="w-full bg-[#F8F4F4] shadow-md shadow-gray-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
                <p>Pokemon</p>
                <div className="flex gap-10">
                   <SearchButton />
                   <button>
                        <Image width={40} src={logo} alt="Pokebola"/>
                   </button>
                </div>
            </div>
        </header>
    )
}