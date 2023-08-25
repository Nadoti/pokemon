"use client"
import { useGetAllPokemon } from "@/hooks/usePokemonApi";
import { Fragment } from "react";
import { PokemonCard } from "./PokemonCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";


export function PokemonList() {
    // const {
    //     isLoading,
    //     data: pokemonPage,
    //     error,
    // } = useGetAllPokemon();

    // if(isLoading) {
    //     return "Carregando"
    // }

    // if(error) {
    //     return "Erro"
    // }

    const {data: resul, isLoading: load, isError: err} = useQuery({
        queryKey: [`pokemonGeneration`],
        queryFn: async () => 
            axios.get(`https://pokeapi.co/api/v2/generation/1/`),
            staleTime: 100000,
    })

    return (
        <main className="grid min-h-screen grid-cols-4 gap-5 py-5">
            {load ? (
                <Loading />
            ) : (
                resul?.data.pokemon_species.map((pokemon) => (
                    <PokemonCard 
                        key={pokemon.name}
                        pokemonName={pokemon.name}
                        pokemonUrl={pokemon.url}
                    />
                ))
            )}
        </main>
    )
}