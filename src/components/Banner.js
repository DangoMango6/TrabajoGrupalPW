import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2 className='texthead'>Ofertas por Black Friday</h2>
        <br></br>
        <p className='textdesc'>¡Hasta 50% de descuento en productos seleccionados!</p>
        <br></br>
        <Link to="/descuentos" className="btn">Comprar ahora</Link>
      </div>
    </section>
  );
};

export default Banner;
