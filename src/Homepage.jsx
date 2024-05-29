import React, { useState, useEffect } from "react";
import './Homepage.css';
import axios from 'axios';

function Homepage() {
    const [isLoading, setIsLoading] = useState(true);
    const [championList, setChampionList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const response = await axios.get('/api/champions');
                console.log('Champions: ', response.data)
                setChampionList(prevList => {
                    const newChampionList = response.data;
                    return newChampionList;
                });
            } catch (error) {
                console.error('Error fetching champions:', error);
            }
        };

        fetchChampions();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = championList.filter((champion) => champion.name.toLowerCase().startsWith(value.toLowerCase()));
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        setSuggestions([]);
    };

    return (
        <div className="container">
            <div className="center-content">
                <div className="search-champion">
                    <img src="/lol-logo.svg.png" alt="Logo" className="logo" />
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter champion..."
                            className="input"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <img src="search-icon.jpg" alt="search icon" />
                    </div>
                </div>
                <div className="champion-list">
                    {championList.map((champion, index) => (
                        <div className="champion" key={index}>{champion.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
