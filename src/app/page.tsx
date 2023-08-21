import { Header } from "@/components/Header";
import { PokemonList } from "@/components/pokemon/PokemonList";


export default function Home() {
  return (
    <section className="w-full bg-[#F8F4F4]">
      <Header />
      <div className="max-w-7xl h-full mx-auto">
        <PokemonList />
      </div>
    </section>
  )
}
