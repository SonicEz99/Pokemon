"use client"
import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function pokeinfo() {

    const params = useParams();
    const [pokemon, setPoke] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        setLoading(true);
        const fetchPokeDetail = async () => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
            const Poke =  await response.json();
            setPoke(Poke);
            console.log(Poke);
          } catch (error) {
            console.log(error);
          }
    
          setLoading(false);
        };
    
        fetchPokeDetail();
    
      }, []);

  return (
    <div className='p-24'>

        <Link href={"/"} className="bg-blue-500 text-white p-3 rounded-md">Go black</Link>
        <div className="flex justify-center items-center mt-10 text-center">
            <div className="shadow-md p-10 rounded-md">
                {loading ? (
                    <p>Loading detail..</p>
                ):(
                    <>
                        <h3 className="text-3xl">{pokemon.name}</h3>
                        <Image src={pokemon.sprites ?.other.home.front_default} width={300} height={300} alt={pokemon.name} />
                        <div className="my-3">
                            <p class="my-3"> Weight : {pokemon.weight}</p>
                            <p className="my-3">
                                Abilities: {""}
                                {pokemon.abilities?.map(val =>(
                                    <span key={val.ability.name} className="bg-gray-500 mx-1 text-white px-3 py-1 rounded-md">
                                        {val.ability.name}
                                    </span>
                                ))}
                            </p>
                            <p className="my-3">
                                Type: {""}
                                {pokemon.types?.map(val =>(
                                    <span key={val.type.name} className="bg-gray-500 mx-1 text-white px-3 py-1 rounded-md">
                                        {val.type.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>

    </div>
  )
}

export default pokeinfo

