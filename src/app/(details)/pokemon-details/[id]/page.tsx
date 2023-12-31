"use client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

interface FlavorTextEntry {
    flavor_text: string;
    language: {
      name: string;
    };
}

interface AttributesProps {
    base_stat: string, 
    stat: {
        name: string
    }
}

export default function DetailsPokemon({ params }: { params: { id: string } }) {
    const {data: response, isLoading: loading, isError: error} = useQuery({
        queryKey: [`pokemonSpecies${params.id}`],
        queryFn: async () => 
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`),
            enabled: Boolean(params.id),
            staleTime: 100000,
    })

    const {data: results, isLoading, isError} = useQuery({
        queryKey: [`pokemonSoloDetails${response?.data.name}`],
        queryFn: async () => 
            axios.get(`https://pokeapi.co/api/v2/pokemon/${response?.data.name}`),
            enabled: Boolean(response?.data.name),
            staleTime: 100000,
    })

    const description = response?.data.flavor_text_entries.find((description: FlavorTextEntry) => {
        return description.language.name === 'en'
    })

    return (
        <main className="w-full h-screen grid lg:grid-cols-2 grid-cols-1">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-20 text-left w-full max-w-[30rem]">
                    <Link href='/' className="w-20 h-20 flex items-center justify-center border border-gray-500 rounded-full transition-all hover:bg-gray-500 hover:text-white">
                        {"<-   "}Voltar
                    </Link>
                </div>
                <span className="flex gap-5 mb-20">
                    {results?.data.types.map(({type}: {type:{name: string}}, index: number) => (
                        <Fragment key={index}>
                            <p className={` bg-gray-300 py-2 px-6 rounded-xl text-black`}>{type.name}</p>
                        </Fragment>
                    ))}
                </span>
                <div className="relative w-[30rem] h-[30rem] max-w-full mb-5 flex items-center justify-center mx-auto">
                    <div className="absolute w-full h-full  rounded-full blur-3xl" style={{ background: response?.data.color.name}} />
                    <Image 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`}
                        alt={'sa'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full mx-auto flex items-center justify-center"
                        loading="lazy"
                        priority={false}
                        placeholder="empty"
                        fill
                    />
                </div>
                <div className="w-full max-w-[30rem] flex flex-col gap-5 lg:items-start items-center">
                    <h1 className="text-3xl font-bold capitalize">{response?.data.name}</h1>
                    <div className="flex items-center gap-10">
                        <span className="">
                            <p className="font-bold text-xl">Height:</p>
                            <p className="text-base text-gray-700">{results?.data.height}</p>
                        </span>
                        <span className="">
                            <p className="font-bold text-xl">Weight:</p>
                            <p className="text-base text-gray-700">{results?.data.weight}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center lg:text-left lg:mt-0 mt-8 text-center">
                <div className="w-full max-w-[50rem]">
                    <div className="mb-5">
                        <p className="font-bold text-xl">Description: </p>
                        <p className="text-base text-gray-700">{description?.flavor_text}</p>
                    </div>
                    <div className="mb-5">
                        <h2 className="font-bold text-xl">Generation</h2>
                        <p>{response?.data.generation.name}</p>
                    </div>
                    <div className="mb-5">
                        <h2 className="font-bold text-xl">Abilities:</h2>
                        <ul>
                            {results?.data.abilities.map(({ability}: {ability: {name: string}}, index: number) => (
                                <Fragment key={index}>
                                    <li>
                                        {ability.name}
                                    </li>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-10 mb-5 lg:justify-normal justify-center">
                        <div>
                            <h2 className="font-bold text-xl">Habitat</h2>
                            <p>{response?.data.habitat.name}</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl">Egg Groups</h2>
                            <ul>
                                {response?.data.egg_groups.map((egg:{name: string}, index: number) => (
                                    <Fragment key={index}>
                                        <li>
                                            {egg.name}
                                        </li>
                                    </Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl">Attributes</h2>
                        <ul className="flex flex-col  gap-2 pb-4">
                            {results?.data.stats.map((attribute: AttributesProps, index: number) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <span className="font-bold lg:font-normal">{attribute.stat.name}:</span>
                                    <li>
                                        {attribute.base_stat}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}