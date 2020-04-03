import React from "react";
import { Alert, Button, Divider, Row, Col, Modal, Input } from "antd";
import "../../global/api";

import axios from "axios";

import api from "../../global/api";
const baseURL = "http://25.48.59.169:8080/api";

export default class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nutrions: null,
      flag: false
    };
  }

  getNutrions = async () => {
    await api.getLoot("nutritions", this.props.person._id).then(x => {
      x !== "" ? this.setState({ nutrions: x, visible: true }) : console.log();
    });
  };

  timeForPLC = async () => {
    await axios.post(`${baseURL}/nutritions/${this.props.person._id}`);
  };

  handleChangeNutritions = (e) =>{
    this.setState({ nutrions: {...this.state.nutrions, nutrionsPerKg: {...this.state.nutrions.nutrionsPerKg, [e.target.name] : e.target.value }} });
  }

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
              Белки: {Math.trunc(this.state.nutrions.proteins)} г. Жиры:
              {Math.trunc(this.state.nutrions.lipids)}г. Углеводы:
              {Math.trunc(this.state.nutrions.carbos)} г. ККал:
              {Math.trunc(this.state.nutrions.kcal)}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              Кол-во белков на кг массы тела:
                {this.state.flag ? <Input  name="proteins" 
                onChange={(e) => this.handleChangeNutritions(e)} 
                value={this.state.nutrions.nutrionsPerKg.proteins}/>
                 : this.state.nutrions.nutrionsPerKg.proteins}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              Кол-во жиров на кг массы тела:
                {this.state.flag ? <Input name="lipids"
                 onChange={(e) => this.handleChangeNutritions(e)} 
                 value={this.state.nutrions.nutrionsPerKg.lipids}/> 
                 : this.state.nutrions.nutrionsPerKg.lipids}
            </h3>
            <Row>
              <Button value="small" style ={{marginBottom:12}}
               onClick={() => this.state.flag ? 
                (this.setState({ flag: false }),
                api.updateLoot("nutritions",  {nutrionsPerKg : this.state.nutrions.nutrionsPerKg, kcal: this.state.nutrions.kcal}, this.props.person._id )).then(() => {this.getNutrions()})
                : 
                this.setState({ flag: true })} >

                {this.state.flag ? <>Подтвердить</> : <>Редактировать</> }
                </Button>

            </Row>
          </>
        )}
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%" , marginBottom:12, marginRight: 10 }}
          onClick={() => this.getNutrions()}
        >
          КБЖУ
        </Button>
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%" , marginBottom:12, marginRight: 10 }}
          onClick={() => {
            this.timeForPLC();
          }}
        >
          Расчитать БЖУ
        </Button>
        <Button type="primary" size="middle" style={{ margin: "1%", marginBottom:10, marginRight: 10 }}>
          Сгенерировать PDF
        </Button>
      </>
    );
  }
}
