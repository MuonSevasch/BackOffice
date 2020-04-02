import React, { Component } from "react";

import { Input, Select, Button, Row } from "antd";

import RecipeConstructor from "../RecipeConstructor";

export default class SingleRecipe extends Component {
  state = {
    editFlag: false
  };

  handleEditFlag = () => {
    this.setState({ editFlag: !this.state.editFlag });
  };
  render() {
    const { recipe } = this.props;
    const { editFlag } = this.state;
    return (
      <div>
        {editFlag && (
          <>
            <RecipeConstructor recipe={recipe} />
          </>
        )}
        {!editFlag && (
          <div>
            <span>{recipe.name}</span>
            {recipe.ingridients.length !== 0 &&
              recipe.ingridients.map((el, index) => {
                return (
                  <li className="li-container" key={index}>
                    <span>{el.product.name}</span>

                    <span>{el.amount}</span>
                  </li>
                );
              })}
          </div>
        )}
        <div>
          {recipe.category.map(el => (
            <span>{el}</span>
          ))}
        </div>
        <Button onClick={this.handleEditFlag}></Button>
      </div>
    );
  }
}
