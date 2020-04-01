import React, { Component } from "react";

import { Button, Modal } from "antd";

export default class RecipeConstructor extends Component {
  handleCancel = () => {
    this.props.showConstructor();
  };
  handleOk = () => {
    this.props.showConstructor();
  };

  render() {
    const { showConstructor, setShowConstructor } = this.props;
    return (
      <div>
        <Button onClick={setShowConstructor} type="primary">
          Добавить рецепт
        </Button>

        <Modal
          title="Новый рецепт"
          centered={true}
          visible={showConstructor}
          onOk={setShowConstructor}
          onCancel={setShowConstructor}
        ></Modal>
      </div>
    );
  }
}
