import React from "react";
import { Button } from "antd";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button type="primary">Добавить рецепт</Button>
        <Button type="primary">Редактровать</Button>
        <Button size="small" type="danger">
          Удалить рецепт
        </Button>
      </div>
    );
  }
}
