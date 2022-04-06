export default function Search({input, setInput, countries, setFilteredCountries}) {

    const handleInput = (e) => {
        setInput(e.target.value);
        
        const newCountries = countries.filter((country) => {
            return country
                .name
                .common
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        });

        setFilteredCountries(newCountries);
    }

    return (
        <div>
            <form>
                Find countries: 
                <input
                    value={input}
                    onChange={handleInput}
                    type="text"
                />
            </form>
        </div>
    )
}