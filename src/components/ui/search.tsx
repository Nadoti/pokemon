'use client';
import { useState } from "react";
import { Search } from 'lucide-react';


export function SearchButton() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button className="bg-none border border-gray-300 relative h-9 w-full justify-start rounded-[0.5rem] text-sm sm:pr-24 md:w-40 lg:w-64 text-gray-600 hover:bg-gray-300">
                Find the pokemon
                <span className="absolute right-0 pr-4">
                    <Search color="gray" size={20} />
                </span>
            </button>
        </>
    )
}