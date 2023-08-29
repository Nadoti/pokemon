"use client"
import { Fragment, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { pokemonGenerations } from "@/data/pokemonGenerations";

export function PokemonList() {
    const [idGeneration, setIdGeneration] = useState(1)

    const {data: resul, isLoading: load, isError: err} = useQuery({
        queryKey: [`idGeneration`, idGeneration],
        queryFn: async () => 
            axios.get(`https://pokeapi.co/api/v2/generation/${idGeneration}/`),
            staleTime: 100000,
    })
    function changeGenerationPokemon(id: number) {
        setIdGeneration(id)
    }
    return (
        <main >
            {load ? (
                <Loading />
            ) : (
                <>
                    <div className="w-fit mx-auto my-4">
                        <p className="text-center text-2xl mb-2">Generation</p>
                        <ul className="flex justify-center px-6 gap-6">
                            
                            {pokemonGenerations.map(({label, id, name}) => (
                                <Fragment key={id}>
                                    <button
                                        onClick={() => changeGenerationPokemon(id)} 
                                        className={`shadow-sm rounded-lg shadow-gray-400 p-2 hover:scale-125 ${resul?.data.name === name ? "bg-red-300 cursor-not-allowed hover:scale-100" : ""}`}>
                                        <li className="text-lg">{label}</li>
                                    </button>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                
                    <div className="grid min-h-screen sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 py-5 2x1:px-4 lg:px-4 xl:px-0 sm:px-4 px-4 ">
                        {resul?.data.pokemon_species.map((pokemon) => (
                            <PokemonCard 
                                key={pokemon.name}
                                pokemonName={pokemon.name}
                                pokemonUrl={pokemon.url}
                            />
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}