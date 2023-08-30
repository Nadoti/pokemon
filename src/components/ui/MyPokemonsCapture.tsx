"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ModalIncreaseStatus } from "../ModalIncreaseStatus";
import { toast } from 'react-toastify';

interface Pokemon {
  id: number;
  name: string;
  generation: string;
  color: string;
  type: {
    name: string;
  }[];
  status: {
    name: string;
    baseStatus: number;
  }[];
}


export function MyPokemonsCapture() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const {data: response, isLoading} = useQuery({
    queryKey: [`listPokemonCapture`, []],
    queryFn: async () => 
      axios.get(`http://localhost:3000/api/take-all-pokemon`),
      enabled: true,
      manual: true,
  })
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon>()

  useEffect(() => {
    setPokemonSelected(!isLoading ? response?.data[0] : {})
  }, [response])


  async function deletePokemon() {
    const body = {
      id: pokemonSelected?.id
    }
    const response = await axios.post("http://localhost:3000/api/delete-pokemon", body)
    if(response.status === 200) {
      toast.success('Pokemon deleted successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }
  }

  function increaseStatus() {
    setIsModalOpen(true)
  }

  return (
    <section>
      <h1 className="text-2xl text-center py-4 lg:py-8">List Pokemon</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-8">
          <div className="flex items-center justify-center pb-8">
            <div className="flex flex-col gap-4 w-full max-w-xs h-96 pt-4 shadow-md shadow-gray-400 overflow-y-scroll text-center">
              {response.data.map((pokemon: Pokemon) => (
                <div key={pokemon.id} className="w-full">
                  <button
                    onClick={() => setPokemonSelected(pokemon)}
                    className={`text-lg font-bold transition-all hover:text-white hover:bg-slate-400 w-full py-2 ${pokemon.id === pokemonSelected?.id ? "bg-slate-600 text-white cursor-not-allowed hover:bg-slate-600" : ""}`}
                  >
                    {pokemon.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {pokemonSelected ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="relative w-40 h-32 max-w-full mb-5 flex items-center justify-center mx-auto ">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonSelected?.id}.svg`}
                  alt={pokemonSelected?.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full mx-auto flex items-center justify-center"
                  loading="lazy"
                  priority={false}
                  placeholder="empty"
                  fill
                />
              </div>
              <h1 className="text-2xl">{pokemonSelected?.name}</h1>
              <p>{pokemonSelected?.generation}</p>
              <p className={`p-2 rounded-lg font-bold ${pokemonSelected?.color === "blue" ? "text-white" : "text-black"}`} style={{background: pokemonSelected?.color}}>{pokemonSelected?.color}</p>
              <div className="flex gap-4">
                {pokemonSelected?.type?.map((types) => (
                  <Fragment key={types.name}>
                    <p>{types.name}</p>
                  </Fragment>
                ))}
              </div>
              <div className="flex flex-col gap-2 items-center mb-4">
                {pokemonSelected?.status?.map((stat, i) => (
                  <div className="flex gap-2" key={i}>
                    <p className="text-gray-600">{stat.name}:</p>
                    <p>{stat.baseStatus}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-8">
                <button
                  onClick={increaseStatus}
                  className="bg-blue-500 text-white py-2 px-4 font-bold rounded-lg transition-all border-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
                >
                  Increase status
                </button>
                <button
                  onClick={deletePokemon}
                  className="bg-red-500 text-white py-2 px-4 font-bold rounded-lg transition-all border-2 hover:border-red-500 hover:bg-transparent hover:text-red-500"
                >
                  Delete Pokemon
                </button>
              </div>
              {isModalOpen && (
                <ModalIncreaseStatus 
                  pokemonId={pokemonSelected?.id}
                  status={pokemonSelected?.status}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl">You have no pokemon on your list!</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}