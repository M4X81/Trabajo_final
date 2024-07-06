import React from 'react'
import '../styles/wallet.css'


export default function Wallet() {
  return (
    <div className='div_ppal'>
        <div className="contenedor-externo fondo-lila">
<div className="contenedor">
    <div className="banner funcionalidades">
        <div className="banner-hijo texto">
            <p>Tu llave al mundo de las criptomonedas</p>                    
            <ul>
                <li className="wallet-funcionalidad">Almacena y gestiona todas tus criptomonedas, NFT y múltiples billeteras en un solo lugar</li>
                <li className="wallet-funcionalidad">Compatibilidad con Bitcoin, Ethereum, Solana, Dogecoin y todas las redes compatibles con Ethereum</li>
                <li className="wallet-funcionalidad">Explora miles de tokens y dapps en tu teléfono o navegador</li>
                <li className="wallet-funcionalidad">Protege tus activos digitales con opciones de seguridad líderes en la industria</li>
            </ul>
            <a className="boton" href="#descargas">Descargá la app</a>
        </div>
        <div className="banner-hijo media">
            <video loop autoPlay muted>
                <source src="./img/imagenes-banners/banner-animation.mp4" type="video/mp4"></source>
            </video>
        </div>
    </div>    
</div>        
</div>

<div className="contenedor-externo margen-superior">
<div className="contenedor">
    <h3 className="titulo">¿Por qué elegir Criptocodo para tu wallet?</h3>
</div>
</div>


<div className="contenedor cuatro-columnas">
<div className="ventaja-item">
    <p className="ventaja-titulo">Controle sus criptomonedas</p>
    <p>Coinbase Wallet es una billetera de autocustodia que le brinda control total de sus criptomonedas</p>
    <img src="./img/icons8-llave-32.png" alt="Ilustrativo" className="logo"></img>
</div>
<div className="ventaja-item">
    <p className="ventaja-titulo">Almacena y gestiona tus NFT</p>
    <p>Almacena y visualiza de forma segura todos tus NFT de Ethereum, Base, Optimism, Polygon y Solana en una sola billetera</p>
    <img src="./img/icons8-organización-32.png" alt="Ilustrativo" className="logo"></img>
</div>
<div className="ventaja-item">
    <p className="ventaja-titulo">Seguridad líder del sector</p>
    <p>Las opciones de seguridad adicionales en todos tus dispositivos y la compatibilidad con el dispositivo de billetera proporcionan más formas de mantener tus criptomonedas seguras</p>
    <img src="./img/icons8-safebox-32.png" alt="Ilustrativo" className="logo "></img>
</div>
<div className="ventaja-item">
    <p className="ventaja-titulo">Trabaje con Criptocodo</p>
    <p>¿Ya eres cliente de Coinbase? Vincula tu cuenta de Criptocodo a tu Wallet para acceder fácilmente a tus criptomonedas</p>
    <img src="./img/icons8-billetera-32.png" alt="Ilustrativo" className="logo"></img>
</div>
</div>
<div className="contenedor-externo margen-superior">
<div className="contenedor descarga" id="descargas">
    <h2>¡Descargá la app ahora!</h2>
</div>
</div>
<br></br>
<div className="contenedor">
<h3 className="titulo">Seleccioná tu sistema para descargar:</h3>
</div>
<div className="contenedor cuatro-columnas">
<div className="descarga-item">
    <p className="descarga-titulo">Descarga para iOS</p>
    <p>Descarga el Wallet del App Store</p>
    <img src="./img/app-store.png" alt="App Store Logo" className="logo_pointer"></img>
</div>
<div className="descarga-item">
    <p className="descarga-titulo">Descarga para Android</p>
    <p>Descarga el Wallet desde el Play Store</p>
    <img src="./img/play-store.png" alt="Play Store Logo" className="logo_pointer"></img>
</div>
<div className="descarga-item">
    <p className="descarga-titulo">Descarga para Chrome</p>
    <p>Descarga la extensión de Chrome desde el Chrome Web Store</p>
    <img src="./img/google-chrome.png" alt="Chrome Logo" className="logo_pointer"></img>
</div>
<div className="descarga-item">
    <p className="descarga-titulo">Descarga para Firefox</p>
    <p>Descarga la extensión para Firefox desde el store</p>
    <img src="./img/mozilla-firefox.png" alt="Firefox Logo" className="logo_pointer"></img>
</div>
</div>
<div className="contenedor-externo disclaimer">
<div className="contenedor">
    <p>
        Al utilizar este Sitio, aceptas los Términos de servicio de Criptocodo, las pautas de marca de Criptocodo y todas las reglas y políticas de Criptocodo, que pueden estar disponibles y actualizadas de vez en cuando. Todos los nombres de empresas, productos y servicios que se utilicen en este sitio son solo a fines de identificación y no se consideran promoción. Reconoce que Criptocodo es el titular único de todas las marcas comerciales de Criptocodo y se compromete a usar el contenido del sitio o las marcas de Criptocodo solo con fines personales o comerciales. Criptocodo puede revisar el uso de los materiales de marca en cualquier momento y se reserva el derecho de finalizar o modificar cualquier uso.
    </p>   
</div>
</div>
    </div>
  )
}
