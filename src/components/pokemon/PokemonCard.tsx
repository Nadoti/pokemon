import { useListPokemonCart } from "@/stateGlobal/listPokemonCart";
import { useCartModal } from "@/stateGlobal/modalCartStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardType {
    pokemonName: string;
    pokemonUrl: string
}

interface ColorProps {
    green: string
}


export function PokemonCard({ pokemonName, pokemonUrl }: PokemonCardType) {
    const listPokemon = useListPokemonCart((state) => state.listCart)
    const addPokemonOnList = useListPokemonCart((state) => state.addPokemonOnList)
    const openCartModal = useCartModal((state) => state.openCartModal)

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

    function addPokemonCart(response, results) {
        const teste = listPokemon.find((list) => list.id === response.id)
        if(!teste) {
            addPokemonOnList({
                id: response.id,
                name: response.name,
                type: results.types.map((element) => {
                    return {
                        slot: element.slot,
                        name: element.type.name
                    }
                } ),
                generation: response.generation.name,
                color: response.color.name,
                status: results.stats.map((element) => {
                    return {
                        baseStatus: element.base_stat,
                        name: element.stat.name
                    }
                } )
            })
            openCartModal()
            return
        }
        toast.error(`Pokemon is already in the cart`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <>
            {!isLoading && !loading && (
                <div  className={`w-full border-2 rounded-lg p-2 cursor-pointer hover:shadow-2xl relative`} style={{borderColor: response?.data.color.name}}>
                    <Link href={`/pokemon-details/${response?.data.id}`} className={`absolute top-0 left-0 p-4 rounded-r-full rounded-tl-lg ${response?.data.color.name === "blue" ? "text-white" : "text-black"} hover:scale-105`} style={{background: response?.data.color.name}}> Details</Link>
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
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <p className="font-bold">Type:</p>
                        <span className="flex">
                            {results?.data.types.map((type, index) => (
                                <div key={index}>
                                    <p>{type.slot >= 2 && '/'}{type.type.name}</p>
                                    
                                </div>
                            ))}
                        </span>
                    </div>
                    <button
                        onClick={() => addPokemonCart(response.data, results.data)}
                        className={`w-full py-2 rounded-lg font-bold ${response?.data.color.name === "blue" ? "text-white" : "text-black"} hover:scale-105`} 
                        style={{background: response?.data.color.name}}
                    >
                        Capture
                    </button>
                </div>
            )}
        </>
    )
}