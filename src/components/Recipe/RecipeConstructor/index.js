import React, { Component } from "react";

import { Input, Select, Button, Row } from "antd";

import Api from "../../../global/api";

import "./recipe-constructor.css";
const { Option } = Select;

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

  changeIngredient = (value, index) => {
    console.log(value);
    const { ingridients } = this.state;

    let newIngredients = ingridients.map((ingredient, i) =>
      i === index ? { ...ingredient, product: value } : ingredient
    );

    this.setState({
      ingridients: newIngredients
    });
  };

  handleCategory = value => {
    this.setState({
      category: value
    });
  };

  handleSubmit = () => {
    const { name, ingridients, category } = this.state;
    const { recipe, setShowConstructor, handleEditFlag } = this.props;

    if (recipe) {
      Api.updateRecipe(`meal/${recipe._id}`, { name, ingridients, category });
      handleEditFlag();
    } else {
      Api.addRecipe("meals", { name, ingridients, category });
      setShowConstructor();
    }
  };

  handleChange = (event, index) => {
    const { ingridients } = this.state;
    switch (event.target.name) {
      case "name":
        this.setState({ [event.target.name]: event.target.value });
        break;

      case "amount":
        if (!event.target.value.match(/^[0-9]*$/)) {
          break;
        }
        let newIngredients = ingridients.map((ingredient, i) =>
          i === index
            ? { ...ingredient, amount: event.target.value }
            : ingredient
        );

        this.setState({
          ingridients: newIngredients
        });
        break;

      default:
        return;
    }
  };

  render() {
    const { ingridients, food } = this.state;

    const foodOptions = food.map(d => <Option key={d._id}>{d.name}</Option>);

    return (
      <div className="constructor-container">
        <div className="input-container">
          <Input
            style={{ width: 200, marginBottom: "20px" }}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Название рецепта"
          />
        </div>
        <Button onClick={this.addIngredient}>Добавить ингредиент</Button>

        <Row justify="space-around" align="middle">
          <ul className="ul-container">
            {ingridients.length !== 0 &&
              ingridients.map((el, index) => {
                return (
                  <li className="li-container" key={index}>
                    <Select
                      showSearch
                      name="ingridient"
                      style={{ width: "60%" }}
                      placeholder="Выберите ингредиент"
                      optionFilterProp="children"
                      onChange={value => this.changeIngredient(value, index)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {foodOptions}
                    </Select>

                    <Input
                      style={{ width: "20%" }}
                      name="amount"
                      value={el.amount}
                      onChange={event => this.handleChange(event, index)}
                      placeholder="100"
                    />

                    <Button
                      style={{ width: "20%" }}
                      onClick={() => this.deleteIngredient(index)}
                    >
                      Удалить
                    </Button>
                  </li>
                );
              })}
          </ul>
        </Row>

        <Select
          mode="multiple"
          style={{ width: "100%", margin: "1rem 0" }}
          placeholder="Завтрак"
          onChange={this.handleCategory}
        >
          <Option value="breakfast">Завтрак</Option>
          <Option value="lunch">Обед</Option>
          <Option value="dinner">Ужин</Option>
          <Option value="snack">Перекус</Option>
        </Select>

        <Button
          onClick={this.handleSubmit}
          type="primary"
          size="middle"
          style={{ margin: "1%" }}
        >
          Подтвердить
        </Button>
      </div>
    );
  }
}
