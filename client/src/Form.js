import React from 'react';
import styled from 'styled-components';
import { StyledForm, Button } from './Styled';

const Input = styled.input`
  width: 80%;
  height: 2em;
  font-size: 1.2em;
  padding-left: 1em;
  margin: 0.5em;
  border-radius: 4px;
  border: none;
`;

const DefaultSelect = Input.withComponent('select');

const Select = DefaultSelect.extend`
  width: 85%;
`;

const Form = ({
  handleChange,
  handleSubmit,
  fields: { symptoms, survey, wellbeing }
}) => (
  <StyledForm onSubmit={handleSubmit}>
    <h3>Evening Check</h3>
    Medication Taken
    <Select onChange={handleChange} id="medication_taken">
      <option>Yes</option>
      <option>No</option>
    </Select>
    <Input
      onChange={handleChange}
      value={symptoms}
      type="text"
      id="symptoms"
      placeholder="what are your symptoms"
    />
    <Input
      value={survey}
      onChange={handleChange}
      type="text"
      id="survey"
      placeholder="Survey Questions"
    />
    <Input
      value={wellbeing}
      onChange={handleChange}
      type="text"
      id="wellbeing"
      placeholder="Wellbeing: choose a number from 1-100"
    />
    <Input type="date" id="date_of_check" onChange={handleChange} />
    <Button>Submit Evening Check</Button>
  </StyledForm>
);

export default Form;
