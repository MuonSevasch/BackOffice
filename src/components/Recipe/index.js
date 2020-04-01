import React, { Component } from "react";
import { Spin } from "antd";

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
            <RecipeConstructor
              showConstructor={this.state.showConstructor}
              setShowConstructor={this.setShowConstructor}
            />

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
