import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="#" className="hover:underline cursor-not-allowed">POKEMON</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 cursor-not-allowed">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 cursor-not-allowed">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 cursor-not-allowed">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline cursor-not-allowed">Contact</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
