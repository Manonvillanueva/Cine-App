import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Navigation = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("code");
  const [sortVote, setSortVote] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR`
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
        <button onClick={() => setSortVote("badToGood")}>
          Top <i className="fa-solid fa-arrow-up"></i>
        </button>
        <button onClick={() => setSortVote("goodToBad")}>
          Flop <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
      {data
        .sort((a, b) => {
          if (sortVote === "badToGood") {
            return a.vote_average - b.vote_average;
          } else if (sortVote === "goodToBad") {
            return b.vote_average - a.vote_average;
          }
        })
        .map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
    </div>
  );
};

export default Navigation;
