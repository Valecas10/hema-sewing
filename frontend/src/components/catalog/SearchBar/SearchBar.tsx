import "./SearchBar.css";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function SearchBar({
    value,
    onChange,
    placeholder = "Buscar productos...",
}: SearchBarProps) {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="search-bar__input"
            />
        </div>
    );
}

export default SearchBar;