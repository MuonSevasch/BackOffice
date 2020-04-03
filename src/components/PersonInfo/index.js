import React from "react";
import { Alert, Button, Divider, Row, Col, Modal } from "antd";
import "../../global/api";

import axios from "axios";

import api from "../../global/api";
const baseURL = "http://25.48.59.169:8080/api";

export default class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nutrions: null
    };
  }

  getNutrions = async () => {
    await api.getLoot("nutritions", this.props.person._id).then(x => {
      x !== "" ? this.setState({ nutrions: x, visible: true }) : console.log();
    });
    console.log(this.state.nutrions);
  };

  timeForPLC = async () => {
    await axios.post(`${baseURL}/nutritions/${this.props.person._id}`);
  };

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          {this.props.person.firstName} {this.props.person.lastName}
        </h1>
        <h4>email: {this.props.person.email}</h4>
        <h4> Рост: {this.props.person.height}</h4>
        <h4> Вес: {this.props.person.weight}</h4>
        <h4> Возраст: {this.props.person.age}</h4>

        {this.state.visible && (
          <>
            <h3 style={{ textAlign: "center" }}>
              Белки: {Math.trunc(this.state.nutrions.proteins)} г. Жиры:{" "}
              {Math.trunc(this.state.nutrions.lipids)}г. Углеводы:{" "}
              {Math.trunc(this.state.nutrions.carbos)} г. ККал:{" "}
              {Math.trunc(this.state.nutrions.kcal)}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              Кол-во белков на кг массы тела:{" "}
              {this.state.nutrions.nutrionsPerKg.proteins}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              {" "}
              Кол-во жиров на кг массы тела:{" "}
              {this.state.nutrions.nutrionsPerKg.lipids}
            </h3>
          </>
        )}
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%" }}
          onClick={() => this.getNutrions()}
        >
          А не пойти бы тебе нахуй
        </Button>
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%" }}
          onClick={() => {
            this.timeForPLC();
          }}
        >
          Расчитать БЖУ
        </Button>
        <Button type="primary" size="middle" style={{ margin: "1%" }}>
          Сгенерировать PDF
        </Button>
      </>
    );
  }
}
