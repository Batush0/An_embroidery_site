import React from 'react'

import './Styles/Navbar.css'

const NavBar = () => {

  return (
    <header>
      <h1 id='company'>ESRA DESEN</h1>
        <ul>
            <li>
              <a href='/products'><h3>Ürünler</h3></a>
            </li>
            {/* <li>
              <a href='/about'><h3>Hakkımda</h3></a>
            </li> */}
            <li>
              <a href='contacts'><h3>Iletişim</h3></a>
            </li>
        </ul>
    </header>
  )
}

export default NavBar