import React, { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import axios from "axios";

export default function LocationAutocomplete({ value, onChange, placeholder, className }) {
    const [query, setQuery] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    // Sync internal state if external value changes (e.g. valid selection or clear)
    useEffect(() => {
        setQuery(value || "");
    }, [value]);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Debounced search function
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 2 && isOpen) {
                // Only search if user typed >2 chars and dropdown is conceptually 'open' for typing
                // We track 'isOpen' to distinguish between 'just selected' vs 'typing'
                setLoading(true);
                try {
                    // Using Nominatim OpenStreetMap API
                    // limiting to Kenya (countrycodes=ke) per user context, or remove for global
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                            query
                        )}&countrycodes=ke&addressdetails=1&limit=5`
                    );
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching locations:", error);
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [query, isOpen]);

    const handleInputChange = (e) => {
        const newVal = e.target.value;
        setQuery(newVal);
        onChange(newVal); // update parent with raw text while typing
        setIsOpen(true);
    };

    const handleSelect = (place) => {
        const displayName = place.display_name;
        setQuery(displayName);
        onChange(displayName); // update parent with selected full name
        setIsOpen(false);
        setSuggestions([]);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder || "Search location..."}
                    className={`${className} pr-10`} // Ensure padding for icon
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {loading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                        <MapPin className="w-4 h-4" />
                    )}
                </div>
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
                    {suggestions.map((place) => (
                        <li
                            key={place.place_id}
                            onClick={() => handleSelect(place)}
                            className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-none flex items-start gap-2"
                        >
                            <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                            <span>{place.display_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
