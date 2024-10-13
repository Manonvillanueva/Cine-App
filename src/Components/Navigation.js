import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Movies = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("code");
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query="${search}&api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, [search]);
  return (
    <div>
      <div className="navigationContainer">
        <input
          type="text"
          placeholder="Entrez le titre d'un film"
          onChange={(e) =>
            e.target.value ? setSearch(e.target.value) : setSearch("code")
          }
        />
      </div>
      <Cards dataSend={data} />
    </div>
  );
};

export default Movies;
