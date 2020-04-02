import React, { Component } from "react";

import { Button, Row } from "antd";

import RecipeConstructor from "../RecipeConstructor";

import "../recipe.css";

const mealCategories = [
  { breakfast: "Завтрак" },
  { lunch: "Обед" },
  { dinner: "Ужин" },
  { snack: "Перекус" }
];

export default class SingleRecipe extends Component {
  state = {
    editFlag: false
  };

  handleEditFlag = () => {
    this.setState({ editFlag: !this.state.editFlag });
  };
  render() {
    const { recipe, updateFoods, updateRecipe } = this.props;
    const { editFlag } = this.state;
    return (
      <div>
        {editFlag && (
          <>
            <RecipeConstructor
              recipe={recipe}
              updateRecipe={updateRecipe}
              updateFoods={updateFoods}
              handleEditFlag={this.handleEditFlag}
            />
          </>
        )}
        {!editFlag && (
          <div>
            <span>{recipe.name}</span>
            <ul className="ul-container">
              {recipe.ingridients.length !== 0 &&
                recipe.ingridients.map((el, index) => {
                  console.log(el);
                  return (
                    <li className="li-container" key={index}>
                      <span>{el.product.name}</span>
                      <span>{el.amount}</span>
                    </li>
                  );
                })}
            </ul>
            <div>
              {recipe.category.map((el, i) => (
                <span key={i}>{mealCategories[el]}</span>
              ))}
            </div>
            <Button onClick={this.handleEditFlag}>Редактировать</Button>
          </div>
        )}
      </div>
    );
  }
}
