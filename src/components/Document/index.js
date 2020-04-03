import React, { Component } from "react";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import { mealCategories } from "../../utils";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default class PDFdoc extends Component {
  state = {
    menu: {}
  };

  render() {
    const { mealPlan } = this.props;

    let weeks = [];
    for (let i = 1; i < 4; i++) {
      const curWeek = `week${i}`;
      weeks = [
        ...weeks,
        mealPlan[curWeek].map((day, index) => {
          const dailyMeals = Object.keys(day).map(meal => {
            const mealIngredients = day[meal].ingridients.map(ingredient => {
              return (
                <>
                  <Text>
                    {ingredient.product.name}, {ingredient.amount}
                  </Text>
                </>
              );
            });
            return (
              <>
                <Text>
                  {mealCategories[meal]}: {day[meal].name}:
                </Text>
                {mealIngredients}
              </>
            );
          });

          return (
            <>
              <Text>День: {index} </Text>
              <Text>{day.kcal} ккал</Text>
              {dailyMeals}
            </>
          );
        })
      ];
    }


    console.log(weeks)

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  }
}
