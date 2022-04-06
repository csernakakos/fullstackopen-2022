export default function Search({input, setInput, countries, setFilteredCountries}) {

    const handleInput = (e) => {
        const enteredString = e.target.value.toLowerCase();
        setInput(enteredString);

        console.log(enteredString, "INPUT");

        const newCountries = countries.filter((country) => {
            return country
                .name
                .common
                .toLowerCase()
                .includes(enteredString)
        });

        setFilteredCountries(newCountries);
    }

    return (
        <div>
            <form>
                Find countries: <input
                value={input}
                onChange={handleInput}
                type="text"
                />
            </form>
        </div>
    )
}