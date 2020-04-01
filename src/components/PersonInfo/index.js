import React from "react";
import { Button, Divider, Row, Col, Modal } from "antd";
import "antd/dist/antd.css"


export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPerson: this.props.currentPerson,
            visible: false,
        }
    }


    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      showModal = () => {
        this.setState({
          visible: true,
        });
      };

    render() {
        return (
            <div className="person-info" style={{ textAlign: "center" }}>
                <Row justify="space-around" align="middle" key={this.state.currentPerson._id}>
                    <h1>{this.state.currentPerson.firstName}</h1>
                    <h1>{this.state.currentPerson.lastName}</h1>
                    <Button  onClick={this.showModal} type="primary" size="middle" style={{ margin: "5%" }}>Развернуть</Button>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                    </Modal>
                <Button danger type="primary" size="middle" style={{ margin: "5%" }}>Удалить</Button>
                </Row>
            </div >
        )
    }
}