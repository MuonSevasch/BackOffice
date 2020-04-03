import React from "react";
import PersonInfo from "../PersonInfo";

import { Button, Row, Col, Modal, Input } from "antd";

import "./index.css";

import Api from "../../global/api";

class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      search: "",
      visible: false,
      person: null
    };
  }

  componentDidMount() {
    // Api.login(this.state.username, this.state.password).then(() => {
    Api.getAllLoot("userForms").then(result => {
      this.setState({ persons: result });
    });
    // });
  }

  updatePersons = () => {
    Api.getAllLoot("userForms").then(x => {
      this.setState({ persons: x });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  showModal = async pers => {
    console.log(pers._id);
    Api.getLoot("userForms", pers._id).then(x => {
      this.setState({
        visible: true,
        person: x
      });
    });
  };

  filterPoets = () => {
    let filteredPoets = this.state.persons;
    filteredPoets = filteredPoets.filter(poet => {
      let poetName = poet.firstName.toLowerCase() + poet.lastName.toLowerCase();
      return poetName.indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return filteredPoets;
  };

  deleteOnClick = async person => {
    await Api.deleteLoot("userforms", person._id);
    this.updatePersons();
  };

  render() {
    let parasha = this.filterPoets().map((person, index) => {
      return (
        <div
          className="person-info"
          style={{ textAlign: "center", marginBottom: 15,  maxWidth: "90%"}}
          key={person._id}
        >
          <Row justify="space-around" align="middle">
            <Col xs={24} md={6}>
              <p>{person.firstName}</p>
            </Col>
            <Col xs={24} md={6}>
              <p>{person.lastName}</p>
            </Col>
            <Col xs={24} md={6}>
              <Button
                onClick={() => this.showModal(person)}
                type="primary"
                size="middle"
                style={{ margin: "1% 10%" }}
              >
                Развернуть
              </Button>

              <Button
                danger
                type="primary"
                size="middle"
                style={{ margin: "1% 10%" }}
                onClick={() => {
                  this.deleteOnClick(person);
                }}
              >
                Удалить
              </Button>
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <div style={{ textAlign: "center", margin:"0 5%"}}>
        <Input
          style={{ width: "11.42rem", marginBottom: "20px" }}
          value={this.state.search}
          onChange={e => {
            this.setState({ search: e.target.value });
          }}
          placeholder="Поиск"
        />
        <Modal
          destroyOnClose={true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <PersonInfo person={this.state.person} />
        </Modal>
        {parasha}
      </div>
    );
  }
}

export default PersonList;
