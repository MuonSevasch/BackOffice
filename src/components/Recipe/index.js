import React, { Component } from "react";
import { Modal, Spin } from "antd";

import RecipeList from "./RecipeList";
import RecipeConstructor from "./RecipeConstructor";

export default class Recipe extends Component {
  state = {
    showConstructor: false
  };

  setShowConstructor = () => {
    this.setState({ showConstructor: !this.state.showConstructor });
  };

  render() {
    const { loading, error, recipes } = this.props;
    return (
      <>
        {error && (
          <>
            {/* <Error name={"Task"} /> */}
            <span>Произошла ошибка</span>
          </>
        )}

        {loading && (
          <>
            <Spin size="large" />
          </>
        )}

        {!error && !loading && (
          <div>
            {/* <Modal
              title={recipe ? recipe.name : "Новый рецепт"}
              centered={true}
              destroyOnClose={true}
              visible={this.state.showConstructor}
              onOk={this.setShowConstructor}
              onCancel={this.setShowConstructor}
              okText="Подтвердить"
              cancelText="Отмена"
            >
              <RecipeConstructor
                showConstructor={this.state.showConstructor}
                setShowConstructor={this.setShowConstructor}
              />
            </Modal> */}
            <RecipeList
              recipes={recipes}
              setShowConstructor={this.setShowConstructor}
            />
          </div>
        )}
      </>
    );
  }
}
