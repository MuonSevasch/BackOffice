import React, { Component } from "react";

import { Modal } from "antd";

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
        <Modal
          title="Новый рецепт"
          centered={true}
          visible={showConstructor}
          onOk={setShowConstructor}
          onCancel={setShowConstructor}
          okText="Подтвердить"
          cancelText="Отмена"
        ></Modal>
      </div>
    );
  }
}
