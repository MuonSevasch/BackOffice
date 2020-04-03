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
            <h4>{recipe.name}</h4>
            <ul className="ul-container">
              {recipe.ingridients.length !== 0 &&
                recipe.ingridients.map((el, index) => {
                  console.log(el);
                  return (
                    <li className="li-container" key={index}>
                      <h4>
                        {el.product.name}: {el.amount}
                      </h4>
                    </li>
                  );
                })}
            </ul>
            <div>
              {recipe.category.map((el, i) => (
                <h4 key={i}>{mealCategories[el]}</h4>
              ))}
            </div>
            <Button onClick={this.handleEditFlag}>Редактировать</Button>
          </div>
        )}
      </div>
    );
  }
}
