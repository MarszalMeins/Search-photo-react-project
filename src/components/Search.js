import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Search.css";

function Search() {
    const [autocompleteResoults, setAutocompleteResoults] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [errorAutocomplete, setErrorAutocomplete] = useState(false)

    let navigate = useNavigate();

    const handleAutocompleteResoult = (text) => {
        navigate("/resoults", {state: text})
        setAutocompleteResoults([])
    }

    const afterClick = async (e) => {
        if ((e.target.value).length > 2 ) {
            const autocomplete = e.target.value

            await Axios.post("https://boiling-bayou-17846.herokuapp.com/", {
                autocomplete
            })
            .then((response) => {
                if (response.data.data.autocomplete.length === 0) {
                    setErrorAutocomplete(true)
                    setAutocompleteResoults([])
                }
                else {
                    setErrorAutocomplete(false)
                    setAutocompleteResoults(response.data.data.autocomplete)
                }       
            }).catch((error) => {
                setErrorAutocomplete(true);
            });
        }
        else {
            setErrorAutocomplete(false)
            setAutocompleteResoults([])
        }

        setSearchValue(e.target.value)
    }

    const keyPress = (e) => {
        if (e.key === "Enter") {
            navigate("/resoults", {state: searchValue})
        }
    }

    return (
        <div className="form_group">
            <input 
            type="text" 
            id="search" 
            className="search_panel" 
            placeholder="Search photo" 
            onKeyPress={keyPress} 
            onChange={afterClick}>
            </input>
            
            <div className = { errorAutocomplete ? ("error_show") : ("error_hide") }>No match!</div>

            <div className="search_content">
                {autocompleteResoults && (
                    <ul className="autocomplete_panel">
                        {autocompleteResoults.map((autocompleteResoults, index) => {
                            return <div 
                            key={index} 
                            className="autocomplete_options" 
                            onClick={() => handleAutocompleteResoult(autocompleteResoults.query)}>

                                {autocompleteResoults.query}

                            </div>
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Search;