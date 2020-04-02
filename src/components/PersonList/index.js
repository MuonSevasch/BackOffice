import React from "react";
import PersonInfo from "../PersonInfo";

import { Button, Divider, Row, Col, Modal, Input } from "antd";


import "./index.css"

import api from "../../global/api";


class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      visible: false,
      person: null
    };
  }

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

  showModal = async (pers) => {
    console.log(pers._id)
    api.getLoot('userForms', pers._id).then(x => {
      this.setState({
        visible: true,
        person: x
      })
    })

  };




  filterPoets = () => {
    let filteredPoets = this.props.persons;
    filteredPoets = filteredPoets.filter(poet => {
      let poetName = poet.firstName.toLowerCase() + poet.lastName.toLowerCase();
      return poetName.indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return filteredPoets;
  };

  deleteOnClick = async (person) => {
    await api.deleteLoot('userforms', person._id);
    await this.props.updatePersons()
  }

  render() {
    let parasha = this.filterPoets().map((person, index) => {
      return (
        <div
          className="person-info"
          style={{ textAlign: "center" }}
          key={person._id}
        >
          <Row justify="space-around" align="middle">
            <Col span={6}><p>{person.firstName}</p></Col>
            <Col span={6}><p>{person.lastName}</p></Col>
            <Col span={6}>
              <Button
                onClick={() => this.showModal(person)}
                type="primary"
                size="middle"
                style={{ margin: "1%" }}
              >
                Развернуть
              </Button>

            </Col>
            <Col span={6}>
              <Button danger type="primary" size="middle" style={{ margin: "1%" }} onClick={() => { this.deleteOnClick(person) }}>
                Удалить
              </Button>
            </Col>
          </Row>
        </div>
      );
    });


    return (
      <div style={{ textAlign: "center" }}>
        <Input
          style={{ width: 200, marginBottom: "20px" }}
          value={this.state.search}

          onChange={(e) => { this.setState({ search: e.target.value }) }}
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
