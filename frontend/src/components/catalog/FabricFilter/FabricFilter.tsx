import type { Fabric } from "../../../types/fabric";

import "./FabricFilter.css";

interface FabricFilterProps {
    fabrics: Fabric[];
    value: string;
    onChange: (value: string) => void;
}

function FabricFilter({
    fabrics,
    value,
    onChange,
}: FabricFilterProps) {
    return (
        <div className="fabric-filter">
            <label htmlFor="fabric-filter">
                Tipo de tela
            </label>

            <select
                id="fabric-filter"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            >
                <option value="all">
                    Todas
                </option>

                {fabrics.map((fabric) => (
                    <option
                        key={fabric.id}
                        value={fabric.slug}
                    >
                        {fabric.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FabricFilter;