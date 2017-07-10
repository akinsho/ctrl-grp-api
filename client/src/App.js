import React, { Component } from 'react';
import styled from 'styled-components';

import { Button, flex } from './Styled';
import Form from './Form';

const AppWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  ${flex}
`;

const Patient = styled.div`
  width: 60%;
  height: auto;
  background-color: whitesmoke;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  ${flex}
  margin: 0.3em;
`;

class App extends Component {
  state = {
    user: {},
    eveningCheck: {},
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
    event.preventDefault();
    fetch('http://localhost:4001/api/v1/users/15/evening', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patient_id: 15,
        date_of_check: '2017/07/08',
        survey_responses: survey,
        wellbeing,
        symptoms,
        medication_taken
      })
    })
      .then(res => res.json())
      .then(json => this.setState({ eveningCheck: json }));
  };

  render() {
    const { user, eveningCheck } = this.state;
    return (
      <AppWrapper>
        <h1>CTRL-Group API Demo</h1>
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
          <Button onClick={this.showMedication}>Show Medication</Button>
        </Patient>
        {eveningCheck.symptoms &&
          <Patient>
            <p>Symptoms: {eveningCheck.symptoms}</p>
            <p>Wellbeing: {eveningCheck.wellbeing}</p>
            <p>
              Medication Taken:
              {eveningCheck.medication_taken === false ? 'No' : 'Yes'}
            </p>
          </Patient>}
        <Form
          fields={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </AppWrapper>
    );
  }
}

export default App;
