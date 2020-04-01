import React from 'react';
import { Button } from 'antd';

import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "test-user",
            password: "my-password"
        }
    }

    handleSubmit = (event) => {
        axios.post("http://25.48.59.169:8080/api/login",
            { "username": this.state.username, "password": this.state.password })
            .then(r => console.log(r))
            .catch(e => console.log(e));

        event.preventDefault();
    }
    render() {
        return (
            <Button onClick={this.handleSubmit}>Проверка</Button>
        );
    }
}

export default Register;