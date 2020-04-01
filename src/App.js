import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
    TeamOutlined,
    ProfileOutlined
} from '@ant-design/icons';



import PersonInfo from "./components/PersonInfo";
import Recipe from './components/Recipe';
import SignIn from './components/SignIn';
import axios from "axios"


const { Content, Sider } = Layout;

class App extends React.Component {
    state = {
        receptVisibility: false,
        collapsed: false,
        isLoaded: false,
        error: null,
        persons: [],
        clientsVisibility: false,
        username: "test-user",
        password: "my-password"
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    componentDidMount() {
        
        axios.post("http://25.48.59.169:8080/api/login",
            { "username": this.state.username, "password": this.state.password }, )
            .then((res) => {console.log(res);
                axios.get("http://25.48.59.169:8080/api/users")
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({ persons: result.data })
                        console.log(this.state.persons)
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                        
                        console.log(error)
                    }
                )})
                
    }

    render() {

        return (
            <Layout style={{ minHeight: '100vh' }}  >
                <Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} width="12.5rm" collapsible={false}>
                    <div className="logo" />
                    <Menu onClick={(e) => { e.key === "1" ? this.setState({ receptVisibility: true, clientsVisibility: false }) : this.setState({ receptVisibility: false, clientsVisibility: true }) }} theme="dark">
                        <Menu.Item key="1" >
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
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.state.receptVisibility && <PersonInfo />}
                            {this.state.clientsVisibility && <Recipe />}
                        </div>
                    </Content>
                </Layout>
            </Layout>

        );


    }
}
export default App;
