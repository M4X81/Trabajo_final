import React from 'react'

export default function Inicio() {
    return (
        <div>
            <div className="contenedor home">
                <div className="banner ">
                    <div className="banner-hijo media">
                        <img src="./img/imagenes-banners/cripto-application.webp" alt="interfaz de aplicación cripto"></img>
                    </div>
                    <div className="banner-hijo texto">
                        <h1>El futuro del dinero ha llegado</h1>
                        <p>Somos el espacio más confiable para que las personas y las empresas compren, vendan y gestionen criptomonedas.</p>

                        <a className="boton" href="./wallet.html">Descargá la app</a>
                    </div>
                </div>
            </div>

            <div className="contenedor-externo margen-superior">
                <div className="contenedor confianza">
                    <h2>La casa de cambio de criptomonedas más confiable</h2>
                    <p>Somos el espacio más confiable para que las personas y las empresas compren, vendan y gestionen criptomonedas.</p>
                </div>
                <div className="contenedor confianza cuatro-columnas">
                    <div className="columna">
                        <img src="./img/icon-worldwide.svg" height="48" width="48" alt="icono globalizacion"></img>
                        <h3>Somos una empresa grande.</h3>
                        <p>Actuamos con transparencia financiera</p>
                    </div>
                    <div className="columna">
                        <img src="./img/icon-afe.svg" height="48" width="48" alt="icono seguridad"></img>
                        <h3>Tus activos están protegidos.</h3>
                        <p>Nuestras medidas de gestión de riesgos están diseñadas para proteger tus activos.</p>
                    </div>
                    <div className="columna">
                        <img src="./img/icon-support.svg" height="48" width="48" alt="icono support"></img>
                        <h3>Obtén la ayuda que necesitas, cuando la necesitas.</h3>
                        <p>Siempre que desees, puedes comunicarte con nuestro equipo de Asistencia al cliente de Coinbase para obtener soluciones rápidas a problemas comunes.</p>
                    </div>
                    <div className="columna">
                        <img src="./img/icon-global-economy.svg" height="48" width="48" alt="icono economia"></img>
                        <h3>Mejores prácticas del sector</h3>
                        <p>CriptoApp admite una variedad de las monedas digitales más populares.</p>
                    </div>
                </div>
            </div>

            <div className="contenedor-externo margen-superior exchange">
                <div className="contenedor areas-lado-a-lado">

                    <div className="area izquierda">
                        <h2 className="titulo">Explore criptomonedas como Bitcoin, Ethereum y Dogecoin</h2>
                        <p>Compre, venda y administre cientos de criptomonedas de manera simple y segura.</p>
                    </div>
                    <div className="area derecha">
                        <a className="boton" href="./exchange.html">Ver más activos</a>
                    </div>

                </div>
            </div>

            <div className="contenedor-externo margen-superior margen-inferior fondo-oscuro">
                <div className="contenedor estadisticas-empresa cuatro-columnas grid">
                    <div className="stat">
                        <div>$154B </div>
                        <p>volumen tradeado por semestre</p>
                    </div>
                    <div className="stat">
                        <div>$193B </div>
                        <p>activos asegurados</p>
                    </div>
                    <div className="stat">
                        <div>100+ </div>
                        <p>países</p>
                    </div>
                    <div className="stat">
                        <div>100+</div>
                        <p>empleados</p>
                    </div>
                </div>
            </div>

            <div className="contenedor-externo ">
                <div className="contenedor">
                    <div className="banner registro">
                        <div className="banner-hijo texto">
                            <h2>Comienza tu cartera hoy</h2>
                            <p>Regístrate hoy mismo para obtener una cuenta Coinbase y descubre lo que el mundo de las finanzas descentralizadas puede hacer por ti.</p>

                            <a className="boton" href="./register.html">Registrarte</a>
                        </div>
                        <div className="banner-hijo media tablet-hide">
                            <img src="./img/imagenes-banners/imagen-registro.webp" alt="variedad de criptomonedas"></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contenedor-externo fondo-lila wallet">
                <div className="contenedor">
                    <div className="banner registro tablet-reverse">
                        <div className="banner-hijo media">
                            <img src="./img/imagenes-banners/chica_cripto.webp" alt="imagen decorativa, chica usando wallet cripto"></img>
                        </div>
                        <div className="banner-hijo texto">
                            <h2>Saque más provecho a sus criptomonedas gracias a nuestra Wallet
                            </h2>
                            <p>Almacene sus criptomonedas en su cartera personal, explore el mundo de las finanzas descentralizadas (DeFi), compre y venda NFT, y mucho más.</p>

                            <a className="boton" href="./wallet.html">Más información</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenedor-externo disclaimer">
                <div className="contenedor">
                    <p>
                        Al utilizar este Sitio, aceptas los Términos de servicio de CriptoApp, las pautas de marca de CriptoApp y todas las reglas y políticas de CriptoApp, que pueden estar disponibles y actualizadas de vez en cuando. Todos los nombres de empresas, productos y servicios que se utilicen en este sitio son solo a fines de identificación y no se consideran promoción. Reconoce que CriptoApp es el titular único de todas las marcas comerciales de CriptoApp y se compromete a usar el contenido del sitio o las marcas de CriptoApp solo con fines personales o comerciales. CriptoApp puede revisar el uso de los materiales de marca en cualquier momento y se reserva el derecho de finalizar o modificar cualquier uso.
                    </p>
                </div>
            </div>
        </div>
    )
};
