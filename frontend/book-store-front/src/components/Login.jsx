import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Cookies } from 'react-cookie';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';

class Login extends Component {

    state = {
        redirect: false
    }
    renderRedirect = () => {
        if (this.state.redirect)
            return <Redirect to='/my-order' />
    }

    redirect = () => {
        this.setState({ redirect: true });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let reqData = {
                    login: values.username,
                    password: values.password
                }
                axios.post(endpoint.concat('/login'), reqData)
                    .then(res => {
                        console.log(res, 'response from login');
                        this.props.onLogin(res);
                        let cookies = new Cookies();
                        cookies.set('jwt', res.headers['x-auth-token']);
                        console.log('cookie jwt set', cookies.get('jwt'));
                        this.redirect();
                    })
                    .catch(err => console.log(err));
            }

        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className='loginFormContainer'>
                {this.renderRedirect()}
                <Form onSubmit={this.handleSubmit} className="login-form">
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                    </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;