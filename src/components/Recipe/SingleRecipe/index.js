import React, { Component } from "react";

import { Button, Row } from "antd";

import RecipeConstructor from "../RecipeConstructor";

import "../recipe.css";

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
            <ul className="ul-container" >
            {recipe.ingridients.length !== 0 &&
              recipe.ingridients.map((el, index) => {
                  console.log(el)
                return (
                  <li className="li-container" key={index}>
                    <span>{el.product.name}</span> 
                    <span>{el.amount}</span>
                  </li>
                );
              })}
              </ul>
          </div>
        )}
        <div>
          {recipe.category.map((el, i )=> (
            <span key={i}>{el}</span>
          ))}
        </div>
        <Button onClick={this.handleEditFlag}></Button>
      </div>
    );
  }
}
