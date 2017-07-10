import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const flex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ${flex}
`;

const Form = styled.form`
  width: 60%;
  height: auto;
  background-color: grey;
  margin: 1em;
  ${flex}
`;

const Patient = styled.div`
  width: 60%;
  height: 20%;
  background-color: whitesmoke;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  ${flex}
  margin: 0.3em;
`;

const Button = styled.button`
  width: 10em;
  height: 3em;
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  margin: 1em;
`;

const Input = styled.input`
  width: 80%;
  height: 2em;
  font-size: 1.2em;
  padding-left: 1em;
  margin: 0.5em;
  border-radius: 4px;
  border: none;
`;

const Select = Input.withComponent('select');

class App extends Component {
  state = {
    user: {},
    wellbeing: '',
    symptoms: '',
    survey: '',
    medication_taken: false
  };

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/users/15')
      .then(res => res.json())
      .then(json => this.setState({ user: json }));
  }

  showMedication = async () => {
    const res = await fetch('http://localhost:4001/api/v1/users/15/medication');
    const medication = await res.json();
    this.setState({
      user: {
        ...this.state.user,
        medicationHistory: medication
      }
    });
  };

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { wellbeing, symptoms, medication_taken, survey } = this.state;
    console.log('this.state', this.state);
    event.preventDefault();
    fetch('http://localhost:4001/api/v1/users/15/evening', {
      method: 'POST',
      body: JSON.stringify({
        patient_id: 15,
        date_of_check: '2017/07/08',
        survey_responses: survey,
        wellbeing,
        symptoms,
        medication_taken: medication_taken === 'yes' ? true : false
      })
    })
      .then(res => res.json())
      .then(json => console.log('json', json));
  };

  render() {
    const { user } = this.state;
    return (
      <AppWrapper>
        Frontend
        <Patient>
          {user
            ? <div>
                <p>Name: {`${user.firstname} ${user.surname}`}</p>
                <p>Day Joined: {user.start_date}</p>
                <p>
                  {user.medicationHistory &&
                    'Medication: ' + user.medicationHistory.medication}
                </p>
              </div>
            : <p>Loading...</p>}
        </Patient>
        <Form onSubmit={this.handleSubmit}>
          <h3>Evening Check</h3>
          Medication Taken
          <Select onChange={this.handleChange} id="medication_taken">
            <option>Yes</option>
            <option>No</option>
          </Select>
          <Input
            onChange={this.handleChange}
            type="text"
            id="symptoms"
            placeholder="what are your symptoms"
          />
          <Input
            onChange={this.handleChange}
            type="text"
            id="survey"
            placeholder="Survey Questions"
          />
          <Input
            onChange={this.handleChange}
            type="text"
            id="wellbeing"
            placeholder="How are you feeling choose a number from 1-100"
          />
          <Button>Submit Evening Check</Button>
        </Form>
        <Button onClick={this.showMedication}>Show Medication</Button>
      </AppWrapper>
    );
  }
}

export default App;
