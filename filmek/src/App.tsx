import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FilmHozzaadas = ({ onAdd }) => {
  const [film, setFilm] = useState({ cim: "", rendezo: "", ev: "", mufaj: "" });

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(film);
    setFilm({ cim: "", rendezo: "", ev: "", mufaj: "" });
  };

  return (
    <div className="container my-4">
      <h3>Film hozzáadása</h3>
      <form onSubmit={handleSubmit} className="border p-3">
        <input
          type="text"
          name="cim"
          placeholder="Film címe"
          className="form-control my-2"
          onChange={handleChange}
          value={film.cim}
          required
        />
        <input
          type="text"
          name="rendezo"
          placeholder="Rendező"
          className="form-control my-2"
          onChange={handleChange}
          value={film.rendezo}
          required
        />
        <input
          type="number"
          name="ev"
          placeholder="Kiadás éve"
          className="form-control my-2"
          onChange={handleChange}
          value={film.ev}
          required
        />
        <input
          type="text"
          name="mufaj"
          placeholder="Műfaj"
          className="form-control my-2"
          onChange={handleChange}
          value={film.mufaj}
          required
        />
        <button className="btn btn-primary">Hozzáadás</button>
      </form>
    </div>
  );
};

const FilmLista = ({ filmek }) => {
  return (
    <div className="container my-4">
      <h3>Film lista sorszámozott listában</h3>
      <ol className="list-group">
        {filmek.map((film, index) => {
          const colors = ["primary", "success", "info", "warning", "danger", "secondary"];
          const color = colors[index % colors.length];
          return (
            <li key={index} className="list-group-item">
              <div><strong className={`text-${color}`}>{film.cim}</strong></div>
              <div><strong className={`text-${color}`}>Rendező:</strong> {film.rendezo}</div>
              <div><strong className={`text-${color}`}>Év:</strong> {film.ev}</div>
              <div><strong className={`text-${color}`}>Műfaj:</strong> {film.mufaj}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
const FilmTabla = ({ filmek }) => {
  return (
    <div className="container my-4">
      <h3>Film lista (táblázatos megjelenés)</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Film címe</th>
            <th>Rendező</th>
            <th>Kiadás éve</th>
            <th>Műfaj</th>
          </tr>
        </thead>
        <tbody>
          {filmek.map((film, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{film.cim}</td>
              <td>{film.rendezo}</td>
              <td>{film.ev}</td>
              <td>{film.mufaj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FilmKartya = ({ filmek, random }) => {
  return (
    <div className="container my-4">
      <h3>{random ? "Filmek kártyákban, random színekkel" : "Filmek kártyákban"}</h3>
      <div className="row">
        {filmek.map((film, index) => {
          const colors = ["primary", "success", "info", "warning", "danger", "secondary"];
          const color = random ? colors[Math.floor(Math.random() * colors.length)] : "dark";
          return (
            <div key={index} className="col-md-4">
              <div className={`card p-3 mb-3 border border-${random ? color : "light"}`}>
                <h5>{film.cim}</h5>
                <p><strong>Rendező:</strong> {film.rendezo}</p>
                <p><strong>Év:</strong> {film.ev}</p>
                <p><strong>Műfaj:</strong> {film.mufaj}</p>
                {random && <button className={`btn btn-${color} mt-2`}>További információ</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App = () => {
  const [filmek, setFilmek] = useState([
    { cim: "The Dark Knight", rendezo: "Christopher Nolan", ev: "2008", mufaj: "Akció, Krimi" },
    { cim: "Avengers: Endgame", rendezo: "Anthony és Joe Russo", ev: "2019", mufaj: "Akció, Sci-Fi" },
    { cim: "Inception", rendezo: "Christopher Nolan", ev: "2010", mufaj: "Akció, Sci-Fi" }
  ]);

  const addFilm = (film) => {
    setFilmek([...filmek, film]);
  };

  return (
    <div>
      <h1 className="text-center my-4">Filmek Világa</h1>
      <p className="text-center my-4">Fedezd fel a legjobb filmeket</p>
      <nav className="container navbar navbar-light bg-light mb-4">
        <a href="#" className="navbar-brand">Filmek</a>
        <a href="#" className="nav-link">Kezdőlap (Filmlista)</a>
        <a href="#" className="nav-link">Felvétel</a>
      </nav>
      <FilmHozzaadas onAdd={addFilm} />
      
      {/* Displaying the table on top */}
      <FilmTabla filmek={filmek} />
      
      {/* List with stacked data */}
      <FilmLista filmek={filmek} />
      
      <FilmKartya filmek={filmek} random={false} />
      <FilmKartya filmek={filmek} random={true} />
    </div>
  );
};

export default App;
