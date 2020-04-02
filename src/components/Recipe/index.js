import React, { Component } from "react";
import { Modal, Spin, Button } from "antd";

import RecipeList from "./RecipeList";
import RecipeConstructor from "./RecipeConstructor";

import Api from "../../global/api";

export default class Recipe extends Component {
  state = {
    error: false,
    recipes: [],
    showConstructor: false
  };

  componentDidMount() {
    Api.getAllLoot("meals")
      .then(result => {
        this.setState({ recipes: result });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  setShowConstructor = () => {
    this.setState({ showConstructor: !this.state.showConstructor });
  };

  updateFoods = () => {
    Api.getAllLoot("meals").then(x => {
      this.setState({ recipes: x });
    });
  };

  render() {
    const { loading, error } = this.props;
    const { recipes } = this.state;
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
                updateFoods={this.updateFoods}
              />
            </Modal>
            <RecipeList
              recipes={recipes}
              updateFoods={this.updateFoods}
              setShowConstructor={this.setShowConstructor}
            />
          </div>
        )}
      </>
    );
  }
}
