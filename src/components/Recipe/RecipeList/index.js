import React, { Component } from "react";
import { Modal, Button, Input } from "antd";

export default class RecipeList extends Component {
  state = {
    search: ""
  };
  render() {
    const { recipes, setShowConstructor } = this.props;
    const { search } = this.state;
    const recipeList = recipes
      .filter(recipe => {
        return recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
      .map((recipe, index) => {
        return <>Sum shit</>;
      });
    return (
      <div>
        <Button onClick={setShowConstructor} type="primary">
          Добавить рецепт
        </Button>

        <Modal
          centered={true}
          destroyOnClose={true}
          visible={this.state.showConstructor}
          onOk={this.setShowConstructor}
          onCancel={this.setShowConstructor}
          okText="Подтвердить"
          cancelText="Отмена"
        ></Modal>

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
