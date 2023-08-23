import { useGetDescription } from "@/hooks/usePokemonApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

interface PokemonCardType {
    pokemonName: string;
    pokemonUrl: string
}

interface ColorProps {
    green: string
}


export function PokemonCard({ pokemonName, pokemonUrl }: PokemonCardType) {
    const {data: results, isLoading, isError} = useQuery({
        queryKey: [`pokemonSoloDetails${pokemonName}`],
        queryFn: async () => 
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
            enabled: Boolean(pokemonName),
            staleTime: 100000,
      })
      
      
    const {data: response, isLoading: loading, isError: error} = useQuery({
        queryKey: [`pokemonSpecies${results?.data.id}`],
        queryFn: async () => 
            axios.get(pokemonUrl),
            enabled: Boolean(results?.data.id),
            staleTime: 100000,
    })

    return (
        <>
            {!isLoading && !loading && (
                <div className={`w-full border rounded-lg p-2 cursor-pointer hover:shadow-2xl`} style={{borderColor: response?.data.color.name}}>
                    <span className={`content-[''] w-5 h-5 block rounded-full`} style={{background: response?.data.color.name}}/>
                    <div className="relative w-40 h-32 max-w-full mb-5 flex items-center justify-center mx-auto ">
                        <Image 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${results?.data.id}.svg`}
                            alt={pokemonName}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full mx-auto flex items-center justify-center"
                            loading="lazy"
                            priority={false}
                            placeholder="empty"
                            fill
                        />
                    </div>
                    <h1 className="text-center capitalize text-2xl mb-5">{pokemonName}</h1>
                    <div className="flex items-center justify-center gap-5 mb-5">
                        <span className="text-center">
                            <p>Weight</p>
                            <p>{results?.data.weight}</p>
                        </span>
                        <span className="text-center">
                            <p>Height</p>
                            <p>{results?.data.height}</p>
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <p className="font-bold">Type:</p>
                        <span className="flex">
                            {results?.data.types.map((type, index) => (
                                <div key={index}>
                                    <p>{type.slot >= 2 && '/'}{type.type.name}</p>
                                    
                                </div>
                            ))}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}