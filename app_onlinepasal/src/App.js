import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar';
import { Row, Col } from 'antd';
import {UserList, UserProfile} from './components/users';
{/*
import {HomePage} from './components/homepage';
import {Dashboard} from './components/dashboard';
import {PatientList} from './components/patients';
import {ECGReport} from './components/report/ecgReport';
import {MedicalReport} from './components/report/medicalReport';

*/}

import {UserForm} from './components/forms';
import './styles/custom.css'
import {useState} from 'react'
import {LoginPage} from './components/login'
import AppRoute from './appRouter'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App = () => {

  return <Router>
            <Switch>
                  <AppRoute exact path="/" component={HomePage} is_public={true}> </AppRoute>
                  <AppRoute exact path="/login" component={LoginPage} is_public={true}>  </AppRoute>
                  <AppRoute exact path="/user/profile" component={UserProfile} is_public={false} />
                  <AppRoute exact path="/user/update/:pk" component={UserForm} is_public={false} />
                  <AppRoute exact path="/about" component={About} is_public={false} > </AppRoute>
                  <AppRoute exact path="/help" component={Help} is_public={false} > </AppRoute>
                  <AppRoute exact path="/user/add" component={UserForm} is_public={false} > </AppRoute>
                  <AppRoute exact path="/user/list" component={UserList} is_public={false} />
                  {/*
                  <AppRoute exact path="/patient/list" component={PatientList} is_public={false} />
                  <AppRoute exact path="/report/ecg" component={ECGReport} is_public={false} />
                  <AppRoute exact path="/report/medical" component={MedicalReport} is_public={false} />
                  */}
            </Switch>
    </Router>
}


function About() {
  return <h2>We are health solution in Nepal. Making remote people accessible to health checkups.</h2>;
}

function Help() {
  return <h2>If you have any queries contact to administration</h2>;
}



export default App;