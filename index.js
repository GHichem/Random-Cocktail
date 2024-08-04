import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    let ingredients = [];
    let measures = [];
    const drink = result.data.drinks[0];

    // Collect all ingredients and their measures
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
          ingredients.push(drink[`strIngredient${i}`]);
          measures.push(drink[`strMeasure${i}`] || '');
      }
    }

    res.render("index.ejs", {
        strimage: drink.strDrinkThumb,
        strDrink: drink.strDrink,
        strIngredients: ingredients,
        measures: measures,
        strInstructions: drink.strInstructions
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
