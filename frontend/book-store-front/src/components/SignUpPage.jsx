import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './SignUpPage.css';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';

class SignUpPage extends Component {
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({ redirect: true });
    }

    renderRedirect = () => {
        if (this.state.redirect)
            return <Redirect to="/login" />
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, val) => {
            if (!err) {
                if (val.password === val.passwordConfirm) {
                    let reqData = _.pick(val, ['login', 'email', 'phone', 'password'])
                    console.log('reqData', reqData);
                    axios.post(`${endpoint}/register/create-user`, reqData)
                        .then(res => {
                            console.log(res);
                            this.setRedirect();
                        })
                        .catch(err => console.log(err));

                }
            }

        });


        // if (this.password.current.value == this.passwordConfirm.current.value) {
        //     let reqData = {
        //         login: this.login.current.value,
        //         email: this.email.current.value,
        //         phone: this.phone.current.value,
        //         password: this.password.current.value
        //     }
        //     console.log(reqData, 'registreu data');
        //     axios.post(endpoint.concat('/register/create-user'), reqData)
        //         .then(res => console.log(res))
        //         .catch(err => console.log(err));
        // }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="signUpContainer">
                {this.renderRedirect()}
                <Form className="signUpForm" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('login', {
                            rules: [{ required: true, message: "Please input login" }]
                        })(
                            <Input
                                placeholder="Login"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: "Please input email" }]
                        })(
                            <Input
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: "Please input email" }]
                        })(
                            <Input
                                placeholder="Phone"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: "Please input password" }]
                        })(
                            <Input
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('passwordConfirm', {
                            rules: [{ required: true, message: "Please input password" }]
                        })(
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedSignUpPage = Form.create()(SignUpPage);
export default WrappedSignUpPage;