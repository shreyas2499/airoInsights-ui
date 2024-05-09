import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const CheckboxList = ({ options, onChange }) => {
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    onChange(id, checked);
  };

  return (
    <FormGroup inline style={{ display: 'inline-flex', justifyContent: 'center' }}>
      {options.map((option) => (
        <div key={option.id} style={{ marginRight: '39px' }}>
            <Label check inline="true">
            <Input
                type="checkbox"
                id={option.id}
                checked={option.checked}
                onChange={handleCheckboxChange}
            />
            {option.name}
            </Label>
        </div>
      ))}
    </FormGroup>
  );
};

export default CheckboxList;
