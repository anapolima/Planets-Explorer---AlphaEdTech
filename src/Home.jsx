import React, { useState } from "react";
import RemoveAccent from "./removeAccents.js";
import logo from "./images/planets-logo.svg";
import "./styles/home.css";

function Home ()
{
    const [planetName, setPlanetName] = useState("")
    const [planetData, setPlanetData] = useState([]);
    const [error, setError] = useState(false);

    function handlePlanetName (event)
    {
        const name = event.target.value;
        const noAccentued = new RemoveAccent();
        noAccentued.setText(name);

        setPlanetName(noAccentued.getText().toLocaleLowerCase());
    }

    async function searchPlanet ()
    {
        const response = await fetch (`https://my-json-server.typicode.com/srsantosdev/planetsapi-fake/planets/${planetName}`)
        const data = await response.json();
        setPlanetData(data);

        if (response.status === 200) 
        {
            setError(false);
            setPlanetData(data);
        }
        else
        {
            setError(true);
        }
    }

    return (
        <>
            <header id="header">
                <div id="logo">
                    <img
                        src={logo}
                        alt="Planets Explorer"/>
                </div>

                <div id="form">
                    <input
                        type="text"
                        name="planet-name"
                        id="planet"
                        onInput={event => handlePlanetName(event)}
                        placeholder="Nome do planeta"/>

                    <button
                        onClick={searchPlanet}>Buscar</button>
                </div>
            </header>

            <main id="planet-info">
                {error ? (<p>Planeta não encontrado.</p>) : (
                <>
                    <h1 id="planet-name">Planeta {planetData.name}</h1>

                    <p className="planet-data">Temperatura: <span className="info">{planetData.temperature}</span></p>
                    <p className="planet-data">Raio: <span className="info">{planetData.radius}</span></p>
                    <p className="planet-data">Diâmetro: <span className="info">{planetData.diameter}</span></p>
                    <p className="planet-data">Duração da rotação: <span className="info">{planetData.rotation_duration}</span></p>
                    <p className="planet-data">Distância do Sol: <span className="info">{planetData.sun_distance}</span></p>
                </>)}
               
            </main>
        </>
    )
}

export default Home