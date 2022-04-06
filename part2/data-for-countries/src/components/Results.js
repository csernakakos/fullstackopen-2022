import { useState } from "react";
import Country from "../components/Country";
import { v4 as uuidv4 } from "uuid";

export default function Results({filteredCountries}) {
    const searchResults = filteredCountries.length;

    const [countryDetails, setCountryDetails] = useState(null);

    const handleClick = (country) => {
        console.log(country);
        setCountryDetails(country);
    }

    // RENDER RESULTS CONDITIONALLY:

    // If more than 10 search results:
    if (searchResults > 10) {
        return (
            <div className="results">
                <p>
                    Too many matches. Refine your search string.
                </p>
            </div>
        )
    }

    // If search results are between 1 and 10:
    if (searchResults > 1 && searchResults <= 10) {
        return (
            <div className="results">
            {filteredCountries.map((country) => {
                return <div key={uuidv4()}>
                            <div >
                                <p style={{display: "inline-block"}}>{country.name.official}</p>
                                <button
                                    style={{marginLeft: "10px"}}
                                    onClick={() => {handleClick(country)}}
                                >Show details
                                </button>
                            </div>
                        </div>
                
            })}
            {countryDetails && <Country country={countryDetails} />}
        </div>
        )
    }

    // If 0 search results:
    if (searchResults < 1) {
        return (
            <div className="results">
                <p>No results.</p>
            </div>
        )
    }


    // If exactly 1 search result:
    if (searchResults === 1) {
      return (
          <Country country={filteredCountries[0]}/>
      )  
    }

}