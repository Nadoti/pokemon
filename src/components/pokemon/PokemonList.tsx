"use client"
import { useGetAllPokemon } from "@/hooks/usePokemonApi";
import { Fragment } from "react";
import { PokemonCard } from "./PokemonCard";


export function PokemonList() {
    const {
        isLoading,
        data: pokemonPage,
        error,
    } = useGetAllPokemon();

    if(isLoading) {
        return "Carregando"
    }

    if(error) {
        return "Erro"
    }

    return (
        <main className="grid h-full grid-cols-4 gap-5 pt-5">
            {pokemonPage?.map((pokemon, index) => (
                <PokemonCard 
                    key={index}
                    pokemonName={pokemon.name}
                    // pokemonImgUrl={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                />
            ))}
        </main>
    )
}