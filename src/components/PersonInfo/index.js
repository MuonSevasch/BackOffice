import React from "react";
import { Button, Row, Input } from "antd";
import { PDFViewer } from "@react-pdf/renderer";

import PDFdoc from "../Document";
import axios from "axios";

import api from "../../global/api";
const baseURL = "http://25.48.59.169:8080/api";

export default class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nutrions: null,
      flag: false,
      showPdf: false
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

  handleChangeNutritions = e => {
    this.setState({
      nutrions: {
        ...this.state.nutrions,
        nutrionsPerKg: {
          ...this.state.nutrions.nutrionsPerKg,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  render() {
    const { visible, nutrions, flag, showPdf } = this.state;
    const { person } = this.props;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          {person.firstName} {person.lastName}
        </h1>
        <h4>email: {person.email}</h4>
        <h4> Рост: {person.height}</h4>
        <h4> Вес: {person.weight}</h4>
        <h4> Возраст: {person.age}</h4>

        {visible && (
          <>
            <h3 style={{ textAlign: "center" }}>
              Белки: {Math.trunc(nutrions.proteins)} г. Жиры:
              {Math.trunc(nutrions.lipids)}г. Углеводы:
              {Math.trunc(nutrions.carbos)} г. ККал:
              {Math.trunc(nutrions.kcal)}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              Кол-во белков на кг массы тела:
              {flag ? (
                <Input
                  name="proteins"
                  onChange={e => this.handleChangeNutritions(e)}
                  value={nutrions.nutrionsPerKg.proteins}
                />
              ) : (
                nutrions.nutrionsPerKg.proteins
              )}
            </h3>

            <h3 style={{ textAlign: "center" }}>
              Кол-во жиров на кг массы тела:
              {flag ? (
                <Input
                  name="lipids"
                  onChange={e => this.handleChangeNutritions(e)}
                  value={nutrions.nutrionsPerKg.lipids}
                />
              ) : (
                nutrions.nutrionsPerKg.lipids
              )}
            </h3>
            <Row>
              <Button
                value="small"
                style={{ marginBottom: 12 }}
                onClick={() =>
                  flag
                    ? (this.setState({ flag: false }),
                      api.updateLoot(
                        "nutritions",
                        {
                          nutrionsPerKg: nutrions.nutrionsPerKg,
                          kcal: nutrions.kcal
                        },
                        person._id
                      )).then(() => {
                        this.getNutrions();
                      })
                    : this.setState({ flag: true })
                }
              >
                {flag ? <>Подтвердить</> : <>Редактировать</>}
              </Button>
            </Row>
          </>
        )}
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%", marginBottom: 12, marginRight: 10 }}
          onClick={() => this.getNutrions()}
        >
          КБЖУ
        </Button>
        <Button
          type="primary"
          size="middle"
          style={{ margin: "1%", marginBottom: 12, marginRight: 10 }}
          onClick={() => {
            this.timeForPLC();
          }}
        >
          Расчитать БЖУ
        </Button>
        <Button
          onClick={() => this.setState({ showPdf: !showPdf })}
          type="primary"
          size="middle"
          style={{ margin: "1%", marginBottom: 10, marginRight: 10 }}
        >
          Сгенерировать PDF
        </Button>
        {showPdf && (
          <PDFViewer width="600px" height="1000px">
            <PDFdoc></PDFdoc>
          </PDFViewer>
        )}
      </>
    );
  }
}
