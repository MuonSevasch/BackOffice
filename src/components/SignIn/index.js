import React, { Component } from "react";

import { Form, Input, Row, Col } from "antd";

export default class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Form>
        <Col>
          <Row>
            <Form.Item
              style={{ width: "25%" }}
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="100"
            />
          </Row>
          <Row>
            <Form.Item
              style={{ width: "25%" }}
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="100"
            />
          </Row>
        </Col>
      </Form>
    );
  }
}
