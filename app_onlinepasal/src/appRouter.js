import React from 'react';
import {Route} from "react-router-dom";
import {LoginPage} from './components/login'
import Sidebar from './components/sidebar';
import { Row, Col } from 'antd';
import {Redirect} from 'react-router-dom'

const AppRoute = ({component: ComponentToRender, path, exact, is_public}) => {
    return (<Route exact path={path}  render={( props => {
                let authToken = localStorage.getItem('authToken');
                if (is_public){
                    return <ComponentToRender {...props} />
                }else if (authToken !== null && authToken !== '' && !is_public){
                    return <Row>
                          <Col span={4} >
                               <Sidebar/>
                          </Col>
                          <Col span={20} >
                          <Row style={{background: '#4c4b4f', padding: '25px'}}>
                            <h2 style={{color: 'white'}}> Healthy Nepali Health Nepal</h2>
                          </Row>

                          <Row style={{margin:'10px', padding: '10px'}}>
                              <ComponentToRender {...props} />
                          </Row>
                          </Col>
                    </Row>
                }else
                    return <Redirect to="/login" />
            })}
        ></Route>
    )
}

export default AppRoute;