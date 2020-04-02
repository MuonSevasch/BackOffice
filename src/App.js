import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import { TeamOutlined, ProfileOutlined } from "@ant-design/icons";

import PersonList from "./components/PersonList";
import Recipe from "./components/Recipe";
import SignIn from "./components/SignIn";
import Api from "./global/api";
import api from "./global/api";

const { Content, Sider } = Layout;

class App extends React.Component {

  state = {
    receptVisibility: false,
    collapsed: false,
    isLoaded: false,
    error: null,
    persons: [],
    recipes: [],
    clientsVisibility: false,
    username: "test-user",
    password: "my-password"
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    Api.login(this.state.username, this.state.password).then(() => {
      Api.getAllLoot("userForms").then(result => {
        console.log(result);

        this.setState({ persons: result });

        console.log(this.state.persons);
      });
    });
    // axios
    //   .post("http://25.48.59.169:8080/api/login", {
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    //   .then(res => {
    //     console.log(res);
    //     axios.get("http://25.48.59.169:8080/api/users").then(
    //       result => {
    //         console.log(result);
    //         this.setState({ persons: result.data });
    //         console.log(this.state.persons);
    //       },
    //       error => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });

    //         console.log(error);
    //       }
    //     );
    //   });
  }
  updatePersons = () => {
    api.getAllLoot('userForms').then(x =>{ this.setState({persons: x })})
  }
  updateFoods = () => {
    api.getAllLoot('meals').then(x =>{ this.setState({recipes: x })})
  }
  render() {
    const { recipes, persons } = this.state;
    console.log(recipes);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width="12.5rm"
          collapsible={false}
        >
          <div className="logo" />
          <Menu
            onClick={e => {
              e.key === "1"
                ? this.setState({
                  receptVisibility: true,
                  clientsVisibility: false
                })
                : this.setState({
                  receptVisibility: false,
                  clientsVisibility: true
                });
                this.updatePersons(); this.updateFoods();
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
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {this.state.receptVisibility && <PersonList persons={persons} updatePersons={this.updatePersons}/>}
              {this.state.clientsVisibility && <Recipe recipes={recipes} />}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
