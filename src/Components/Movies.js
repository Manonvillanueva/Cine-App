import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Test from "./Test";

const Movies = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?query=Movie&api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div>
      <h1>test movies</h1>
      {/* <Cards dataSend={data} /> */}
      <Test dataSend={data} />
    </div>
  );
};

export default Movies;
