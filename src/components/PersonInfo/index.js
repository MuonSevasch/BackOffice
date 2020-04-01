import React from "react";
import { Button, Divider, Row, Col, Modal } from "antd";
import "antd/dist/antd.css";

export default class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { visible } = this.state;
    const { currentPerson } = this.props;
    console.log(currentPerson);
    return (
      <div className="person-info" style={{ textAlign: "center" }}>
        <Row justify="space-around" align="middle" key={currentPerson._id}>
          <h1>{currentPerson.firstName}</h1>
          <h1>{currentPerson.lastName}</h1>
          <Button
            onClick={this.showModal}
            type="primary"
            size="middle"
            style={{ margin: "5%" }}
          >
            Развернуть
          </Button>
          <Modal
            title="Basic Modal"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          ></Modal>
          <Button danger type="primary" size="middle" style={{ margin: "5%" }}>
            Удалить
          </Button>
        </Row>
      </div>
    );
  }
}
