import React, { Component } from "react";
import { Button } from "antd";

export default class RecipeList extends Component {
  render() {
    const { recipes } = this.props;
    const recipeList = recipes.filter((recipe) => {
        if (recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ){
            return true
        }
        return false
    })
    return (
      <div>
        <Button type="primary">Редактировать</Button>
        <Button size="small" type="danger">
          Удалить рецепт
        </Button>
      </div>
    );
  }
}
