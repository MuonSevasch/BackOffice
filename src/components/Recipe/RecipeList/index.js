import React, { Component } from "react";
import { Modal, Button, Input, Row, Col } from "antd";

import SingleRecipe from "../SingleRecipe";
import Api from "../../../global/api";

import "../../PersonList/index.css";

export default class RecipeList extends Component {
  state = {
    search: "",
    visible: false,
    recipe: null
  };

  showModal = recipe => {
    Api.getLoot(`meals`, recipe._id).then(loot => {
      this.setState({
        visible: true,
        recipe: loot
      });
    });
  };

  updateRecipe = async id => {
    await Api.getLoot(`meals`, id).then(loot => {
      this.setState({
        recipe: loot
      });
    });
  };

  handleDeletion = async recipe => {
    await Api.deleteLoot(`meals`, recipe._id);
    this.props.updateFoods();
  };

  render() {
    const { recipes, updateFoods } = this.props;
    const { search, visible } = this.state;
    const recipeList = recipes
      .filter(recipe => {
        return recipe.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
      .map((recipe, index) => {
        return (
          <div
            className="person-info"
            style={{ textAlign: "center", marginBottom: 15 }}
            key={index}
          >
            <Row justify="space-around" align="middle">
              <Col span={12}>
                <p>{recipe.name}</p>
              </Col>
      
      
              <h1>{recipe.name}</h1>
              {/* <h1>{recipe.lastName}</h1> */}
              <Button
                onClick={() => this.showModal(recipe)}
                type="primary"
                size="middle"
                style={{ margin: "1%" }}
              >
                Развернуть
              </Button>
              <Button
                onClick={() => {
                  this.handleDeletion(recipe);
                }}
                size="small"
                type="danger"
              >
                Удалить рецепт
              </Button>
            </Row>
          </div>
        );
      });
    return (
      <div>
        <Modal
          centered={true}
          destroyOnClose={true}
          visible={visible}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          footer={null}
        >
          <SingleRecipe
            recipe={this.state.recipe}
            updateFoods={updateFoods}
            updateRecipe={this.updateRecipe}
          ></SingleRecipe>
        </Modal>

        <Input
          value={this.state.search}
          onChange={e => {
            this.setState({ search: e.target.value });
          }}
          placeholder="Поиск"
        ></Input>
        {recipeList}
      </div>
    );
  }
}
