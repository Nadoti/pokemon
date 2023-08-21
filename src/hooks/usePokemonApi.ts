"use client"
import { PokemonData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllPokemon = () => {
    return useQuery<PokemonData[]>({
      queryKey: ["allPokemon"],
      queryFn: async () => {
        const { data } = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
        );
        return data.results;
      },
    });
};
  
export const useGetDescription = (name: string) => {
    return useQuery({
        queryKey: ["pokemonDescription"],
        queryFn: async () => {
          const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          )
          return data.results
        }
    })
}