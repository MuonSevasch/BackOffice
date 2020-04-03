import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Button } from "antd";
import { TeamOutlined, ProfileOutlined } from "@ant-design/icons";

import SignIn from "./components/SignIn";
import PersonList from "./components/PersonList";
import Recipe from "./components/Recipe";

import Api from "./global/api";

// username: "test-user",
// password: "my-password"

const { Content, Sider } = Layout;

class App extends React.Component {
  state = {
    signedIn: localStorage.signedIn ? localStorage.signedIn : false,
    receptVisibility: false,
    collapsed: false,
    loading: false,
    error: null,

    clientsVisibility: true
  };

  setLoginStatus = () => {
    this.setState({ signedIn: true });
  };

  logout = () => {
    Api.logout().then(res => {
      localStorage.removeItem("signedIn");
    });
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { signedIn } = this.state;

    return (
      <>
        {!signedIn && <SignIn setLoginStatus={this.setLoginStatus} />}
        {signedIn && (
          <Layout style={{ minHeight: "100vh" }}>
            <div className="logo" />
            <Menu
              mode="horizontal"
              onClick={e => {
                e.key === "2"
                  ? this.setState({
                      receptVisibility: true,
                      clientsVisibility: false
                    })
                  : this.setState({
                      receptVisibility: false,
                      clientsVisibility: true
                    });
              }}
              theme="dark"
            >
              <Menu.Item key="1">
                <TeamOutlined />
                <span>Заказы</span>
              </Menu.Item>

              <Menu.Item key="2">
                <ProfileOutlined />
                <span>Рецепты</span>
              </Menu.Item>
            </Menu>

            <Layout className="site-layout">
              <Content style={{ margin: "0 16px" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  {this.state.clientsVisibility && <PersonList />}
                  {this.state.receptVisibility && <Recipe />}
                </div>
              </Content>
            </Layout>
          </Layout>
        )}
      </>
    );
  }
}
export default App;
