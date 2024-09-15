"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

function Pokedata() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPokeData1 = async () => {
    try {
      const response = await axios.get(`/api/pokemon`);
      const data = response.data;
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching parcel data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPokeData = async () => {
      try {
        const response = await fetch("/api/pokemon");
        // const Poke = await response.json();
        const data = response.data;
        setPokemon(data || []);

        // Check if Poke.results exists, otherwise use an empty array
        // setPokemon(Poke.results || []);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchPokeData();
    fetchPokeData1();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPoke = Array.isArray(pokemon)
    ? pokemon.filter((owner) =>
        owner.poke_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

const showPokeDetails = (poke) => {
  Swal.fire({
    title: poke.poke_name,
    html: `
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <img src="${poke.img}" width="150" height="150" alt="${poke.poke_name}" />
          <p>${poke.poke_detail}</p>
        </div>`
    ,
    showCloseButton: true,
    focusConfirm: false,
    background: 'rgba(255, 255, 255)', // สีพื้นหลังขาวโปร่งแสง
    text:'rgba(255, 255, 255)',
    confirmButtonText: 'ADD TO FAVORITE',
    customClass: {
      popup: 'blur-background' // ใช้คลาสนี้สำหรับ custom style
    },
  });
};






//     `<style>
//   .blur-background {
//     position: relative;
//     display: inline-block;
//     padding: 20px;
//     border-radius: 10px;
//     background-color: rgba(255, 255, 255, 0.3); /* สีพื้นหลังขาวโปร่งแสง */
//     backdrop-filter: blur(10px); /* ทำให้พื้นหลังเบลอ */
//     -webkit-backdrop-filter: blur(10px); /* สำหรับ Safari */
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   }
// </style>`
    
  return (
    <div className="container text-center mx-auto ">
     <div className="w-full mt-3 flex justify-end">
            <label
              htmlFor="search-input"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>  
              </div>
              <input
                type="search"
                id="search-input"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              
            </div>
     </div>
          
     {loading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <div className="grid grid-cols-5">
          {filteredPoke.length > 0 ? (
            filteredPoke.map((val, index) => (
              <div
                className="flex justify-center items-center shadow-md translate cursor-pointer hover:shadow-lg m-3 rounded-md"
                key={val.poke_name}
                onClick={() => showPokeDetails(val)} // Call SweetAlert modal on click
              >
                <div>
                  <h3>{val.poke_name}</h3>
                  <Image
                    src={val.img}
                    width={150}
                    height={150}
                    alt={val.poke_name}
                  />
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      🔍
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Pokemon data available</p>
          )}
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default Pokedata;
