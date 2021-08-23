import {Table, Icon, Button, Popconfirm} from 'antd'
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Request from '../api'


export const UserList = (props) => {

    const [state,setState]=useState({
        data:null
    })

    const delete_row = (pk) => {
        Request.del('/users/api/'+pk)
          .then(function (response) {
            setState({data: state.data.filter(function(item, i){return item.pk != pk})})
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            console.log('finally block')
        });
    }

    const cancel = (e) => {
        console.log('cancelled')
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'first_name',
        render:(text, row)=> {
            return [row.first_name, row.last_name].join(' ')
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: 'Active',
        dataIndex: 'is_active',
        key: 'is_active',
        render:(text, row)=> {
            return (text == true ? <Icon type='check-circle' theme='filled'
                style={{color:'green'}}/> : <Icon type='close-circle' theme='filled' style={{color:'red'}} />)
        }
      },
      {
        title: 'Super Staff',
        dataIndex: 'is_staff',
        key: 'is_staff',
        render:(text, row)=> {
            return (text == true ? <Icon type='check-circle' theme='filled'
                style={{color:'green'}}/> : <Icon type='close-circle' theme='filled' style={{color:'red'}} />)
        }
      },
      {
        title: 'SuperUser',
        dataIndex: 'is_superuser',
        key: 'is_superuser',
        render:(text, row)=> {
            return (text == true ? <Icon type='check-circle' theme='filled'
                style={{color:'green'}}/> : <Icon type='close-circle' theme='filled' style={{color:'red'}} />)
        }
      },

      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render:(text, row)=> {
            let update_attr = {to: '/user/update/'+row.pk};
            return (<span><Link {...update_attr}><Button type="primary" size="small" >Edit</Button></Link>
                <Popconfirm
                    title="Are you sure delete this user?"
                    onConfirm={(e) => { e.preventDefault(); delete_row(row.pk)}}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{marginLeft: '10px'}} size="small" type="danger" >Delete</Button>
                </Popconfirm>
            </span>)
        }
      },

    ];

    useEffect(() => {
        Request.get('/users/api/', {})
          .then(function (response) {
            setState({data: response.data.results})
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            console.log('finally block')
        });

    },[])

    console.log(state.data);
    return (
        state.data && <Table dataSource={state.data} rowKey={item => item.pk} columns={columns} />
    )
}


export const UserProfile = () => {
    const [user,setUser]=useState(null);

    const logoutUser = () => {
        localStorage.clear()
        window.location.href = '/';
    }

    return <div>
        <h1>Welcome to Sunya Health</h1>
        <Button onClick={logoutUser} type="primary" size="small" > Logout </Button>
     </div>
}