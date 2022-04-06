import Weather from "./Weather";
import { v4 as uuidv4 } from "uuid";

export default function Country({country}) {
    let languages = [];
    for (const lang in country.languages) {
        languages.push(country.languages[lang]);
    };

    return (
        <div className="results">
        <h2>{country.name.common}</h2>

        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
            {languages.map((language) => (
                <li key={uuidv4()}>
                    <p>{language}</p>
                </li>
            ))}
        </ul>

        <p className="flag">{country.flag}</p>

        <Weather country={country} />
       
        </div>
    )
}