import React, { Component } from "react";
import { Button, Input } from "antd";

export default class RecipeList extends Component {
  state = {
    search: ""
  };
  render() {
    const { recipes } = this.props;
    const { search } = this.state;
    const recipeList = recipes.filter(recipe => {
      return recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }).map((recipe, index) => {
    return <>Sum shit</>
    });
    return (
      <div>
        <Input
          value={this.state.search}
          onChange={e => {
            this.setState({ search: e.target.value });
          }}
          placeholder="Имя"
        ></Input>
        {recipeList}
        <Button type="primary">Редактировать</Button>
        <Button size="small" type="danger">
          Удалить рецепт
        </Button>
      </div>
    );
  }
}
