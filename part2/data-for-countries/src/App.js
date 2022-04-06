import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import "./App.css";

export default function App() {

  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(r => setCountries(r.data));
    }, []);

  useEffect(() => {
    setInput(input);
  }, [input])
  

  return (
    <div className="App">
      <Search
        input={input}
        setInput={setInput}
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />

      <Results
        filteredCountries={filteredCountries}
      />
    </div>
  );
};