import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        e.preventDefault();
        axios.post('/register', {
            xsrfCookieName: 'mytoken',
            xsrfHeaderName: 'csrf-token',
            fname: this.fname,
            sname: this.sname,
            email: this.email,
            pword: this.pword,
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div className= 'register'>
                {this.state.error && <div className='error'>Oops! Try again!</div>}
                <div className= 'regisForm'>
                    <div className='form-group'><input name='fname' placeholder='firstname' onChange={e => this.handleChange(e)} /></div>
                    <div className='form-group'><input name='sname' placeholder='surname' onChange={e => this.handleChange(e)}/></div>
                    <div className='form-group'><input name='email' placeholder='email' onChange={e => this.handleChange(e)}/></div>
                    <div className='form-group'><input name='pword' placeholder='password' type='password' onChange={e => this.handleChange(e)}/></div>
                    <button onClick={e => this.submit(e)}>Register</button>
                </div>
                <div className='regisLink'>
                    Already have an account? <Link to="/login">Click here to Sign in!</Link>
                </div>
            </div>
        );
    }
}
