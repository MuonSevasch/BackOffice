import React, { Component } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import Api from "../../global/api";

import "./form.css";

export default class SignIn extends Component {
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = ({ username, password }) => {
    Api.login(username, password)
      .then(res => {
        if (res !== "failed") {
          this.props.setLoginStatus();
          localStorage.setItem("signedIn", true);
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="body">
      <Form
        className="form"
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={this.handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
