import React from "react";
import PersonInfo from "../PersonInfo"
import { Input } from 'antd';
import { Button, Divider, Row, Col, Modal } from "antd";
import "./index.css"


class PersonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      visible: false,
      person: null,
    }
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
  showModal = (pers) => {
    this.setState({
      visible: true,
      person: pers,
    });
  };

  filterPoets = () => {
    let filteredPoets = this.props.persons
    filteredPoets = filteredPoets.filter((poet) => {
      let poetName = poet.firstName.toLowerCase() + poet.lastName.toLowerCase()
      return poetName.indexOf(
        this.state.search.toLowerCase()) !== -1
    })
    return (
      filteredPoets
    )
  }



  render() {
    let parasha = this.filterPoets().map((person, index) => {
      return (
        <div className="person-info" style={{ textAlign: "center" }} key={person._id}>
          <Row justify="space-around" align="middle">
            <h1>{person.firstName}</h1>
            <h1>{person.lastName}</h1>
            <p>
              <Button
                onClick={()=> this.showModal(person)}
                type="primary"
                size="middle"
                style={{ margin: "1%" }}
              >
                Развернуть
          </Button>
            </p>
            <Button danger type="primary" size="middle" style={{ margin: "1%" }}>
              Удалить
      </Button>
          </Row>
        </div>
      )
    });
    return (
      <div style={{ textAlign: "center" }}>
        <Input style={{ width: 200, marginBottom: "20px" }}
          value={this.state.search}
          onChange={(e) => { console.log(e.target); this.setState({ search: e.target.value }) }}
          placeholder="Имя"
        />
        <Modal
        destroyOnClose= {true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        ><PersonInfo person ={this.state.person} />
        </Modal>
        {parasha}
      </div>
    )
  }
};

export default PersonList;
