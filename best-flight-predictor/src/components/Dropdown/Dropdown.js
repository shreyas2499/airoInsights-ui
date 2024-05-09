import React, { useState } from 'react';
import { Input } from 'reactstrap';

const Dropdown = ({ loc, options = [], onSelect }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (event) => {
        const selectedId = event.target.value;
        setSelectedOption(selectedId);
        const selectedOption = options.find(option => option.id === selectedId);
        onSelect(selectedOption);
    };

    return (
        <div>
            <Input
                className="mb-3"
                type="select"
                value={selectedOption}
                onChange={handleSelect}
            >
                <option disabled value="">{loc}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name} ({option.code})
                    </option>
                ))}
            </Input>
        </div>
    );
};

export default Dropdown;
