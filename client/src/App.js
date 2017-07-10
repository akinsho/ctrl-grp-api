import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import { Button, flex } from './Styled';
import Form from './Form';

//eslint-disable-next-line
injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: Helvetica;
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

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: deepskyblue;
  box-shadow: 0 1px 0 grey;
  color: white;
`;

const apiEndpoint = 'https://ctrl-grp-api.herokuapp.com';

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
    fetch(`${apiEndpoint}/api/v1/users/1`)
      .then(res => res.json())
      .then(json => {
        this.setState({ user: json });
      })
      .catch(err => err);
  }

  showMedication = async () => {
    const res = await fetch(`${apiEndpoint}/api/v1/users/1/medication`);
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
    fetch(`${apiEndpoint}/api/v1/users/1/evening`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patient_id: 1,
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
        <Header><h1>CTRL-Group API Demo</h1></Header>
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
