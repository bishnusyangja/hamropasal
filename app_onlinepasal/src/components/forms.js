import React from 'react'
import {useState, useEffect} from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export const UserForm = (props) => {
  let  pk = props.match && props.match.params && props.match.params.pk;


  const [state,setState]=useState({
        form:{first_name: ''}
    })

  const [settings,setSettings]=useState({
        redirect: false
    })

  let handleSubmit = e => {
    e.preventDefault();
    console.log('submitted', state.form);
  };


  useEffect(() => {
        pk &&
            axios.get('/users/api/'+ pk + '/')
              .then(function (response) {
                setState({form: response.data})
              })
              .catch(function (error) {
                console.log(error)
              })
              .finally(function () {
                console.log('finally block')
            });


    },[])

  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      method: 'post',
      url: '/users/api/',
      data: state.form
    }

    if (pk) {
        config.method = 'patch';
        config.url += pk + '/';
    }

    axios(config).then(function (response) {
            setState({form: response.data});
            setSettings({redirect: true});
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            console.log('finally block')
        });
  }

  const handleChange = (e, field) => {
    e.preventDefault();

    let val = e.target.value;
        setState({form: Object.assign(state.form, {[field]: val})});
      }
  return (
      settings.redirect ? (<Redirect to='/user/list' />) : (
      <React.Fragment>
      <Row>
        <h1>User Form</h1>
      </Row>
      <Row>
          <Col span={14} >
               <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    <Col span={6} > First Name </Col>
                    <Col span={1} > : </Col>
                    <Col span={17} >
                    <Input placeholder="" value={state.form.first_name} onChange={(e) => {handleChange(e, 'first_name')}} />
                    </Col>
                </Form.Item>
                <Form.Item>
                    <Col span={6} > Last Name </Col>
                    <Col span={1} > : </Col>
                    <Col span={17} >
                    <Input placeholder="" value={state.form.last_name} onChange={(e) => {handleChange(e, 'last_name')}} />
                    </Col>
                </Form.Item>
                <Form.Item>
                    <Col span={6} > Email </Col>
                    <Col span={1} > : </Col>
                    <Col span={17} >
                    <Input placeholder="" value={state.form.email} onChange={(e) => {handleChange(e, 'email')}} />
                    </Col>
                </Form.Item>
                <Form.Item>
                    <Col span={6} > Mobile </Col>
                    <Col span={1} > : </Col>
                    <Col span={17} >
                    <Input placeholder="" value={state.form.mobile} onChange={(e) => {handleChange(e, 'mobile')}} />
                    </Col>
                </Form.Item>

                <Form.Item>

                <Button style={{float: 'right'}} type="primary" htmlType="submit" className="login-form-button">
                    Submit
                  </Button>

                </Form.Item>
              </Form>
          </Col>
      </Row>
      </React.Fragment>
    )
)
}