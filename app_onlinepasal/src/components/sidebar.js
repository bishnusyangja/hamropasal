import React from 'react'
import { Menu, Icon, Switch } from 'antd';
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

export default class Sidebar extends React.Component {
  state = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ height:'100vh' }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>User</span>
              </span>
            }
          >
                <Menu.Item key="p2">
                    <Link to="/user/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/user/add">Add User</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/user/list">User List</Link>
                </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Medical Report</span>
              </span>
            }
          >
            <Menu.Item key="5"> <Link to="/report/ecg">ECG Report</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/report/medical">Medical History</Link> </Menu.Item>
            <SubMenu key="sub3" title="Sunya Health">
              <Menu.Item key="7"> <a href="http://api.sunya.health/docs/sw-api/"> API Docs </a></Menu.Item>
              <Menu.Item key="8"><Link to="/help">Help</Link></Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="9"> <Link to="/patient/list">Patient</Link> </Menu.Item>
        </Menu>
      </div>
    );
  }
}