import React, { Component } from "react";

import { mealCategories } from "../../utils";
import { Input } from "antd";

export default class MealPlan extends Component {
  state = {
    mealPlan: null,
    editFlag: false
  };

  componentDidMount() {
    //todo request
  }

  handlePlanChange = (event, rest) => {
    const { mealPlan } = this.state;
    const newMealPlan = {
      ...mealPlan,
      [rest.curWeek]: mealPlan[rest.curWeek].map((day, index) =>
        index === rest.index
          ? {
              ...day,
              [rest.meal]: {
                ...day[rest.meal],
                ingridients: day[rest.meal].ingridients.map(ingredient =>
                  ingredient.product.name === rest.ingredient.product.name
                    ? { ...ingredient, amount: event.target.value }
                    : ingredient
                )
              }
            }
          : day
      )
    };
    this.setState({ newMealPlan });
  };

  render() {
    const { mealPlan, editFlag } = this.state;
    let weeks = [];

    if (mealPlan) {
      for (let i = 1; i < 4; i++) {
        const curWeek = `week${i}`;
        weeks = [
          ...weeks,
          mealPlan[curWeek].map((day, index) => {
            const dailyMeals = Object.keys(day).map(meal => {
              const mealIngredients = day[meal].ingridients.map(ingredient => {
                return (
                  <>
                    <h4>
                      {ingredient.product.name},
                      {editFlag ? (
                        <Input
                          value={ingredient.amount}
                          onChange={event => {
                            this.handlePlanChange(event, {
                              curWeek,
                              index,
                              meal,
                              ingredient
                            });
                          }}
                        ></Input>
                      ) : (
                        ingredient.amount
                      )}
                    </h4>
                  </>
                );
              });
              return (
                <>
                  <h4>
                    {mealCategories[meal]}: {day[meal].name}:
                  </h4>
                  {mealIngredients}
                </>
              );
            });

            return (
              <>
                <h4>День: {index} </h4>
                <h4>{day.kcal} ккал</h4>
                {dailyMeals}
              </>
            );
          })
        ];
      }
    }

    return <div>{weeks}</div>;
  }
}
