import React from 'react';
import '../styles/exchange.css'

export default function Exchange() {
    return (
        <div>
            <div className="contenedor-externo">
                <div className="contenedor exchange">
                    <h1>Criptocodo Exchange</h1>
                    <p>En nuestro sitio podés consultar algunas de las cotizaciones de activos cripto.</p>
                </div>
            </div>

            <div className="contenedor resumen-mercados">
                <h2>Resumen de mercados</h2>
            </div>
            
            <div className="contenedor tres-columnas">
                <div className="exchange-tendencias tarjeta">
                    <h3><img src="img/tenencias.png" alt="logo de tendencias" />Tendencias</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="ranking-activo">Ranking</th>
                                <th>Activo</th>
                                <th>Precio</th>
                                <th>Variación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ranking-activo">1</td>
                                <td>Mina</td>
                                <td>$0.86255484</td>
                                <td className="activo delta-positivo">+0.22%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">2</td>
                                <td>Etc</td>
                                <td>$28.64</td>
                                <td className="activo delta-positivo">+2.80%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">3</td>
                                <td>KCS</td>
                                <td>$10.01</td>
                                <td className="activo delta-negativo">-0.39%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="exchange-tendencia tarjeta">
                    <h3><img src="img/ganancias.png" alt="logo de ganancias" />Mayores ganancias</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="ranking-activo">Ranking</th>
                                <th>Activo</th>
                                <th>Precio</th>
                                <th>Variación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ranking-activo">1</td>
                                <td>NETVR</td>
                                <td>$0.194022</td>
                                <td className="activo delta-positivo">+27.03%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">2</td>
                                <td>SQD</td>
                                <td>$0.11376373</td>
                                <td className="activo delta-positivo">+20.1%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">3</td>
                                <td>BOLT</td>
                                <td>$0.0243</td>
                                <td className="activo delta-positivo">+19.6%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="exchange-tendencias tarjeta">
                    <h3><img src="img/perdidas.png" alt="logo de pérdidas" />Mayores pérdidas</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="ranking-activo">Ranking</th>
                                <th>Activo</th>
                                <th>Precio</th>
                                <th>Variación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ranking-activo">1</td>
                                <td>DDR</td>
                                <td>$0.1314153</td>
                                <td className="activo delta-negativo">-40.2%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">2</td>
                                <td>NLK</td>
                                <td>$1.47837</td>
                                <td className="activo delta-negativo">-34.5%</td>
                            </tr>
                            <tr>
                                <td className="ranking-activo">3</td>
                                <td>BHC</td>
                                <td>$3.78</td>
                                <td className="activo delta-negativo">-32.8%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="contenedor populares">
                <h2>Podrían interesarte</h2>
            </div>
            
            <div className="contenedor tres-columnas populares">
                <div className="exchange-tendencias popular">
                    <h3 className="activo"><img src="img/logo_BTC.png" alt="logo btc" />BTC</h3>
                    <p className="precio">$66,779.78</p>
                    <p className="variacion negativo">-0.05%</p>
                </div>
                <div className="exchange-tendencias popular">
                    <h3 className="activo"><img src="img/logo_ETH.png" alt="logo eth" />ETH</h3>
                    <p className="precio">$386.86</p>
                    <p className="variacion positivo">-1.30%</p>
                </div>
                <div className="exchange-tendencias popular">
                    <h3 className="activo"><img src="img/logo_APE.png" alt="logo ape" />APE</h3>
                    <p className="precio">$1.29</p>
                    <p className="variacion positivo">-1.65%</p>
                </div>
            </div>

            <div className="seccion botones">
                <div className="contenedor centrado">
                    <a href="/register.html" className="boton registro">Registrate para ver más</a>
                    <a href="/wallet.html">Conocer sobre la wallet</a>
                </div>
            </div>

            <div className="seccion exchanges">
                <div className="contenedor">
                    <h2>Principales exchanges spot de criptomonedas</h2>
                    <p>Además de ofrecerte cotizaciones en nuestro sitio, clasificamos y puntuamos los principales exchanges de criptomonedas en función del tráfico, la liquidez, los volúmenes de comercio y la confianza en la legitimidad de los volúmenes de comercio reportados.</p>
                    <p>Acá te mostramos los 10 exchange mejor puntuados de la web.</p>
                    <div className="scrollable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Exchange</th>
                                    <th>Puntaje</th>
                                    <th>Volumen</th>
                                    <th>Liquidez promedio</th>
                                    <th>Visitas semanales</th>
                                    <th>Monedas</th>
                                    <th>Compatible con FIAT</th>
                                    <th>Gráfico de volumen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Binance</td>
                                    <td><p className="puntaje">9.9</p></td>
                                    <td>$11,128,682,186</td>
                                    <td>870</td>
                                    <td>16,885,328</td>
                                    <td>410</td>
                                    <td><p>EUR, GBP, BRL</p></td>
                                    <td><img src="img/exhange-graph/graph-8.svg" alt="gráfico de precio Binance exchange" className="grafico positivo" /></td>
                                </tr>
                                <tr>
                                    <td>Coinbase Exchange</td>
                                    <td><p className="puntaje">8.2</p></td>
                                    <td>$1,152,263,946</td>
                                    <td>727</td>
                                    <td>83,591</td>
                                    <td>247</td>
                                    <td><p>USD, EUR, GBP</p></td>
                                    <td><img src="img/exhange-graph/graph-1.svg" alt="gráfico de precio Coinbase exchange" className="grafico negativo" /></td>
                                </tr>
                                <tr>
                                    <td>Bybit</td>
                                    <td><p className="puntaje">7.8</p></td>
                                    <td>$2,468,676,778</td>
                                    <td>587</td>
                                    <td>87,019,422</td>
                                    <td>607</td>
                                    <td><p>USD, EUR, GBP</p></td>
                                    <td><img src="img/exhange-graph/graph-2.svg" alt="gráfico de precio Bybit" className="grafico positivo" /></td>
                                </tr>
                                <tr>
                                    <td>OKX</td>
                                    <td><p className="puntaje">7.7</p></td>
                                    <td>$1,046,093,783</td>
                                    <td>610</td>
                                    <td>5,982</td>
                                    <td>227</td>
                                    <td><p>USD, EUR, AUD</p></td>
                                    <td><img src="img/exhange-graph/graph-3.svg" alt="gráfico de precio OKX" className="grafico positivo" /></td>
                                </tr>
                                <tr>
                                    <td>Upbit</td>
                                    <td><p className="puntaje">7.6</p></td>
                                    <td>$1,248,959,372</td>
                                    <td>512</td>
                                    <td>2,473,906</td>
                                    <td>302</td>
                                    <td><p>KRW</p></td>
                                    <td><img src="img/exhange-graph/graph-9.svg" alt="gráfico de precio Upbit" className="grafico positivo" /></td>
                                </tr>
                                <tr>
                                    <td>Kraken</td>
                                    <td><p className="puntaje">7.3</p></td>
                                    <td>$704,313,467</td>
                                    <td>754</td>
                                    <td>1,539,966</td>
                                    <td>247</td>
                                    <td><p>USD, EUR, GBP</p></td>
                                    <td><img src="img/exhange-graph/graph-1.svg" alt="gráfico de precio Kraken exchange" className="grafico negativo" /></td>
                                </tr>
                                <tr>
                                    <td>KuCoin</td>
                                    <td><p className="puntaje medio">6.9</p></td>
                                    <td>$640,225,482</td>
                                    <td>655</td>
                                    <td>1,583,541</td>
                                    <td>809</td>
                                    <td><p>USD, AED, ARS</p></td>
                                    <td><img src="img/exhange-graph/graph-5.svg" alt="gráfico de precio KuCoin exchange" className="grafico positivo" /></td>
                                </tr>
                                <tr>
                                    <td>Gate.io</td>
                                    <td><p className="puntaje medio">6.9</p></td>
                                    <td>$2,082,160,083</td>
                                    <td>977</td>
                                    <td>3,675,227</td>
                                    <td>182</td>
                                    <td><p>ALL, AUD, BRL</p></td>
                                    <td><img src="img/exhange-graph/graph-6.svg" alt="gráfico de precio Gate.io exchange" className="grafico negativo" /></td>
                                </tr>
                                <tr>
                                    <td>MEXC</td>
                                    <td><p className="puntaje medio">6.6</p></td>
                                    <td>$1,075,056,124</td>
                                    <td>567</td>
                                    <td>2,667,657</td>
                                    <td>2213</td>
                                    <td><p>USD, EUR, GBP</p></td>
                                    <td><img src="img/exhange-graph/graph-7.svg" alt="gráfico de precio MEXC exchange" className="grafico negativo" /></td>
                                </tr>
                                <tr>
                                    <td>Gemini</td>
                                    <td><p className="puntaje medio">6.4</p></td>
                                    <td>$1,152,263,946</td>
                                    <td>727</td>
                                    <td>83,591</td>
                                    <td>247</td>
                                    <td><p>USD, EUR, GBP</p></td>
                                    <td><img src="img/exhange-graph/graph-3.svg" alt="gráfico de precio Gemini exchange" className="grafico positivo" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="contenedor criptos">
                <img src="/img/imagenes-banners/cripto-logos.png" alt="podes comprar y vender muchisimas criptos distintas en nuestro exchange" />
            </div>

            <div className="contenedor-externo disclaimer">
                <div className="contenedor">
                    <p>
                        Al utilizar este Sitio, aceptas los Términos de servicio de Criptocodo, las pautas de marca de Criptocodo y todas las reglas y políticas de Criptocodo, que pueden estar disponibles y actualizadas de vez en cuando. Todos los nombres de empresas, productos y servicios que se utilicen en este sitio son solo a fines de identificación y no se consideran promoción. Reconoce que Criptocodo es el titular único de todas las marcas comerciales de Criptocodo y se compromete a usar el contenido del sitio o las marcas de Criptocodo solo con fines personales o comerciales. Criptocodo puede revisar el uso de los materiales de marca en cualquier momento y se reserva el derecho de finalizar o modificar cualquier uso.
                    </p>
                </div>
            </div>
        </div>
    );
}

