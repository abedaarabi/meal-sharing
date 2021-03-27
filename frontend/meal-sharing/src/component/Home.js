import { React, useState, useEffect } from "react";
import Reservations from "./Reservations";

import MealForm from "./MealForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetctData = async () => {
    const response = await (await fetch("http://localhost:5000/meals")).json();
    console.log(response);
    setMeals(response);
    setLoading(false);
  };

  const postData = (data) => {
    const newpost = meals.concat(data);
    setMeals(newpost);
  };

  const deleteMeal = async (id) => {
    const reminMeal = meals.filter((meal) => meal.id !== id);
    const axios = require("axios");
    await axios.delete(`http://localhost:5000/deletemeal?id=${id}`);

    setMeals(reminMeal);
  };

  useEffect(() => {
    document.title = "Meal Share";
    fetctData();
  }, []);

  return (
    <Router>
      <div>
        <h1 style={{ backgroundColor: "rebeccapurple", color: "white" }}>
          Meal App
        </h1>
      </div>

      {loading ? (
        <div>
          <h1>Loading..</h1>
        </div>
      ) : (
        <Switch>
          <Route exact path={"/"}>
            <Link to={"/meal"}>
              <button>Add Meals</button>
            </Link>
            <Meal param={meals} remove={deleteMeal} />
          </Route>
          <Route path={"/meals/:id"}>
            <Details param={meals} />
            <Reservations mealLimit={meals} />
          </Route>
          <Route path={"/meal"}>
            <MealForm postData={postData} />
            <Meal param={meals} remove={deleteMeal} />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

function Meal({ param, remove }) {
  return (
    <div>
      {param.map((meal) => (
        <div key={meal.id}>
          <Link to={`/meals/${meal.id}`}>
            <h2 style={{ color: "red" }}>{meal.title}</h2>
          </Link>
          <div>
            <img src={meal.imagePath} alt="" />
          </div>
          <button onClick={() => remove(meal.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function Details({ param }) {
  const params = useParams();

  const currentParam = param.find(
    (paramId) => Number(params.id) === paramId.id
  );

  return (
    <div>
      <Link to={"/"}> Home </Link>
      <h3>{currentParam.created_date}</h3>
      <h3>{currentParam.price} dkk</h3>
      <h3>{currentParam.title}</h3>

      <div></div>
    </div>
  );
}
