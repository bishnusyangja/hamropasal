import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Request from '../api'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logged_in: false};
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      var that = this;
      if (!err) {
        Request.post('/api/auth-token/', values)
          .then(function (response) {
            localStorage.setItem('authToken', response.data.token)
//            that.props.setIsAuthenticated(true);
            that.setState({logged_in: true});
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            console.log('finally block')
        });
      }
    });
  };

  render() {
    if (this.state.logged_in){
        return <Redirect to='/user/profile'  />;
    }

    const { getFieldDecorator } = this.props.form;
    return (<div style={{align: 'center', margin: '300px'}}>
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: '300px', margin: '100px'}}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>

            <br/>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </Form.Item>
      </Form> </div>
    );
  }
}

export const LoginPage = Form.create()(Login)