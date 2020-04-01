import React, { Component } from "react";

import { Modal, Input, Select } from "antd";

import Api from "../../../global/api";
const { Option } = Select;

//сделать добавление мультипл селект+кол-во инпутов, допилить ресипи лист.

export default class RecipeConstructor extends Component {
  state = {
    name: "",
    ingridients: [],
    category: [],
    food: []
  };

  componentDidMount() {
    Api.getAllFood("food").then(food => {
      this.setState({ food });
    });
  }

  handleChange = event => {
    const { ingridients, category } = this.state;
    switch (event.target.name) {
      case "name":
        this.setState({ [event.target.name]: event.target.value });
        break;

      case "amount":
        this.setState({
          ingridients: [
            ...ingridients,
            {
              amount: event.target.value
            }
          ]
        });
        break;
      case "category":
        this.setState({
          [event.target.value]: [...category, event.target.value]
        });
        break;
      default:
        return;
    }
  };
  handleSelect = value => {
    console.log(value);
    const { ingridients } = this.state;
    this.setState({
      ingridients: [...ingridients, { product: value }]
    });
  };

  render() {
    const { showConstructor, setShowConstructor } = this.props;
    console.log(this.state);
    const options = this.state.food.map(d => (
      <Option key={d._id}>{d.name}</Option>
    ));
    return (
      <div>
        <Modal
          title="Новый рецепт"
          centered={true}
          visible={showConstructor}
          onOk={setShowConstructor}
          onCancel={setShowConstructor}
          okText="Подтвердить"
          cancelText="Отмена"
        >
          <Input
            style={{ width: 200, marginBottom: "20px" }}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Имя"
          />
          <Select
            showSearch
            name="ingridient"
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Выберите ингредиенты "
            optionFilterProp="children"
            onChange={this.handleSelect}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options}
          </Select>
          <Input
            style={{ width: 200, marginBottom: "20px" }}
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
            placeholder="Количество"
          />
        </Modal>
      </div>
    );
  }
}
