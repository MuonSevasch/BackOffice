import React, { Component } from "react";

import { Input, Select, Button } from "antd";

import Api from "../../../global/api";
const { Option } = Select;

//сделать добавление мультипл селект+кол-во инпутов, допилить ресипи лист.

export default class RecipeConstructor extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.recipe ? props.recipe.name : "",
      ingridients: props.recipe ? props.recipe.ingridients : [],
      category: props.recipe ? props.recipe.category : [],
      food: []
    };
  }

  componentDidMount() {
    const { recipe } = this.props;
    if (recipe) {
      this.setState({
        ...this.state,
        name: recipe.name,
        ingridients: recipe.ingridients,
        category: recipe.category
      });
    }
    Api.getAllFood("food").then(food => {
      this.setState({ food });
    });
  }

  addIngredient = () => {
    const { ingridients } = this.state;
    this.setState({
      ingridients: [...ingridients, { product: "", amount: "" }]
    });
  };

  deleteIngredient = index => {
    const { ingridients } = this.state;
    let newIngredients = ingridients.filter((ingredient, i) => i !== index);
    this.setState({
      ingridients: newIngredients
    });
  };

  changeIngredient = (product, event) => {
    const { ingridients } = this.state;

    let newIngredients = ingridients.map(ingredient =>
      product === ingredient.product
        ? {
            ...ingredient,
            product: {
              ...ingredient.product,
              product: event.target.value
            }
          }
        : ingredient
    );

    this.setState({
      choices: newIngredients
    });
  };

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
    const { showConstructor, setShowConstructor, recipe } = this.props;
    const { ingridients, food } = this.state;
    console.log(ingridients);
    const options = food.map(d => <Option key={d._id}>{d.name}</Option>);
    return (
      <div>
        <Input
          style={{ width: 200, marginBottom: "20px" }}
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Имя"
        />
        <Button onClick={this.addIngredient}>Добавить ингредиент</Button>
        <div>
          {ingridients.length !== 0 &&
            ingridients.map((el, index) => {
              return (
                <ul className="list-container" key={index}>
                  <div>
                    <div className="select-container">
                      <Select
                        showSearch
                        name="ingridient"
                        style={{ width: 200 }}
                        placeholder="Выберите ингредиент"
                        optionFilterProp="children"
                        onChange={this.handleSelect}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {options}
                      </Select>
                    </div>
                    <div className="input-container">
                      <Input
                        style={{ width: 200, marginBottom: "20px" }}
                        name="amount"
                        value={el.amount}
                        onChange={this.handleChange}
                        placeholder="100"
                      />
                    </div>
                    <Button onClick={() => this.deleteIngredient(index)}>
                      Удалить ингредиент
                    </Button>
                  </div>
                </ul>
              );
            })}
        </div>

        {/* 
          <Input
            style={{ width: 200, marginBottom: "20px" }}
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
            placeholder="Количество"
          /> */}
      </div>
    );
  }
}
