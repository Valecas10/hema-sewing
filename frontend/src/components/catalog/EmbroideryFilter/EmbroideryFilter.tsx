import "./EmbroideryFilter.css";

interface EmbroideryFilterProps {
    value: string;
    onChange: (value: string) => void;
}

function EmbroideryFilter({
    value,
    onChange,
}: EmbroideryFilterProps) {
    return (
        <div className="embroidery-filter">
            <label htmlFor="embroidery-filter">
                Bordado
            </label>

            <select
                id="embroidery-filter"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            >
                <option value="all">
                    Todos
                </option>

                <option value="embroidered">
                    Con bordado
                </option>

                <option value="not-embroidered">
                    Sin bordado
                </option>
            </select>
        </div>
    );
}

export default EmbroideryFilter;