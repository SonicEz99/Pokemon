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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filteredFavoritePoke, setFilteredFavoritePoke] = useState([]);
  const [allpokemon, setallPokemon] = useState([]);

  const fetchPokeData = async () => {
    try {
      const response = await axios.get("/api/pokemon"); // Adjust API endpoint
      const allPokemon = response.data;
      
      // Filter Pokémon where fav_id === 2
      const filteredPoke = Array.isArray(allPokemon)
        ? allPokemon.filter((owner) => owner.fav_id === 2)
        : [];

      setallPokemon(allPokemon); // Set all Pokémon
      setFilteredFavoritePoke(filteredPoke); // Set filtered favorite Pokémon
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

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
          </div>`,
        showCloseButton: true,
        focusConfirm: false,
        background: "rgba(255, 255, 255)",
        confirmButtonText: "ADD TO FAVORITE",
        customClass: {
          popup: "blur-background",
        },
        preConfirm: () => {
          // Send a PUT request when the user clicks "ADD TO FAVORITE"
          return axios
            .put(`http://localhost:3000/api/pokemon/${poke.id}`, { id: poke.id })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error(response.statusText);
              }
              // Handle success response
              Swal.fire({
                icon: "success",
                title: "Added to Favorites!",
                text: `Pokémon ${poke.poke_name} was successfully added.`,
              }).then(() => {
                // Reload the page after success
                window.location.reload();
              });
            })
            .catch((error) => {
              // Handle error response
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong: ${error.message}`,
              });
            });
        },
      });
    };
    
    


    const showPokeDetails2 = (poke) => {
      Swal.fire({
        title: poke.poke_name,
        html: `
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <img src="${poke.img}" width="150" height="150" alt="${poke.poke_name}" />
            <p>${poke.poke_detail}</p>
          </div>`,
        showCloseButton: true,
        focusConfirm: false,
        background: "rgba(255, 255, 255)",
        confirmButtonText: "UNFAVORITE",
        customClass: {
          popup: "blur-background",
        },
        preConfirm: () => {
          // Send a PUT request when the user clicks "UNFAVORITE"
          return axios
            .put(`http://localhost:3000/api/unfav/${poke.id}`, { id: poke.id })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error(response.statusText);
              }
              // Handle success response
              Swal.fire({
                icon: "success",
                title: "Removed from Favorites!",
                text: `Pokémon ${poke.poke_name} was successfully removed.`,
              }).then(() => {
                // Reload the page after success
                window.location.reload();
              });
            })
            .catch((error) => {
              // Handle error response
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong: ${error.message}`,
              });
            });
        },
      });
    };
    


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container text-center mx-auto ">
      <div className="text-center">
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5"
          type="button"
          onClick={toggleSidebar}
        >
          Show Favorite
        </button>
      </div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white dark:bg-gray-800`}
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Favorite
        </h5>
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {loading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <div className="grid grid-cols-1">
          {filteredFavoritePoke.length > 0 ? (
            filteredFavoritePoke.map((val, index) => (
              <div
                className="flex justify-center items-center shadow-md translate cursor-pointer hover:shadow-lg m-3 rounded-md"
                key={val.poke_name}
                onClick={() => showPokeDetails2(val)} // Call SweetAlert modal on click
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
            <p className="mt-5">No Favorite Pokemon data available</p>
          )}
        </div>
      )}
      </div>

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
                  <h3 className="text-white hover:text-blue-500 hover:underline">{val.poke_name}</h3>
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
      <Footer />
    </div>
  );
}

export default Pokedata;
