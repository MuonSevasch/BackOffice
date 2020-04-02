import React, { Component } from "react";
import { Modal, Spin, Button } from "antd";

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
    const { loading, error, recipes, updateFoods } = this.props;
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
            <Button onClick={this.setShowConstructor} type="primary">
              Добавить рецепт
            </Button>

            <Modal
              title={"Новый рецепт"}
              centered={true}
              destroyOnClose={true}
              visible={this.state.showConstructor}
              onCancel={this.setShowConstructor}
              footer={null}
            >
              <RecipeConstructor
                showConstructor={this.state.showConstructor}
                setShowConstructor={this.setShowConstructor}
                updateFoods={updateFoods}
              />
            </Modal>
            <RecipeList
              recipes={recipes}
              updateFoods={updateFoods}
              setShowConstructor={this.setShowConstructor}
            />
          </div>
        )}
      </>
    );
  }
}
