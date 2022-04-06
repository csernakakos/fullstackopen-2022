// import { useState } from "react";

export default function Results({input, countries, filteredCountries}) {
    
    // const [languages, setLanguages] = useState([]);
    const searchResults = filteredCountries.length;

    if (searchResults > 10) {
        return (
            <div className="results">
                <p>
                    Too many matches. Refine your search string.
                </p>
            </div>
        )
    }

    if (searchResults > 1 && searchResults <= 10) {
        return (
            <div className="results">
            {filteredCountries.map((country) => {
                return <p key={country.id}>{country.name.official}</p>
            })}
        </div>
        )
    }

    if (searchResults < 1) {
        return (
            <div className="results">
                <p>No results.</p>
            </div>
        )
    }

    const country = filteredCountries[0];
    console.log(country, "SINGLE COUNTRY");

    let languages = [];
    console.log(country.languages);
    for (const lang in country.languages) {
        languages.push(country.languages[lang]);

    };
    console.log(languages);
    // setLanguages(languagesArray);

    return (
        <div className="results">
        <h2>{country.name.common}</h2>

        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
            {languages.map((language, index) => (
                <li key={index}>
                    <p>{language}</p>
                </li>
            ))}
        </ul>

        <p className="flag">{country.flag}</p>
       
        </div>
    )        
    


}