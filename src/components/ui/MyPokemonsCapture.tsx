"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";

export function MyPokemonsCapture() {
  const {data: response, isLoading, isError} = useQuery({
    queryKey: [`listPokemonCapture`],
    queryFn: async () => 
        axios.get(`http://localhost:3000/api/take-all-pokemon`),
        staleTime: 100000,
  })
  console.log("RESPONSE", response)
  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        response.data.map(pokemon => (
          <div key={pokemon.id}>
            {pokemon.name}
          </div>
        ))
      )}
    </section>
  )
}