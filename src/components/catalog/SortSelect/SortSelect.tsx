import "./SortSelect.css";

interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
}

function SortSelect({
    value,
    onChange,
}: SortSelectProps) {
    return (
        <div className="sort-select">
            <label htmlFor="sort-select">
                Ordenar por
            </label>

            <select
                id="sort-select"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            >
                <option value="name-asc">
                    Nombre A-Z
                </option>

                <option value="name-desc">
                    Nombre Z-A
                </option>

                <option value="price-asc">
                    Precio: menor a mayor
                </option>

                <option value="price-desc">
                    Precio: mayor a menor
                </option>
            </select>
        </div>
    );
}

export default SortSelect;