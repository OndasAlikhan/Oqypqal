import React, { Component } from 'react';
import axios from 'axios';
import './SignUpPage.css';
class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.login = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.password = React.createRef();
        this.passwordConfirm = React.createRef();
    }

    handleSubmit = () => {
        console.log('yes');
        console.log(this.password.current.value);
        console.log(this.passwordConfirm.current.value);
        if (this.password.current.value == this.passwordConfirm.current.value) {
            let reqData = {
                login: this.login.current.value,
                email: this.email.current.value,
                phone: this.phone.current.value,
                password: this.password.current.value
            }
            console.log(reqData, 'registreu data');
            axios.post('http://localhost:3001/register/create-user', reqData)
                .then(res => console.log(res))
                .catch(err => console.log(err));

        }
    }

    render() {
        return (
            <div className="signUpContainer">
                <p>Login</p>
                <input ref={this.login}></input>
                <p>Email</p>
                <input ref={this.email}></input>
                <p>Phone</p>
                <input ref={this.phone}></input>
                <p>Password</p>
                <input ref={this.password}></input>
                <p>Confirm Password</p>
                <input ref={this.passwordConfirm}></input>

                <a className='submitButtonSignUp' onClick={this.handleSubmit}>Submit</a>
            </div>
        );
    }
}

export default SignUpPage;