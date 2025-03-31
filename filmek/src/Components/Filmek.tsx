import { useState, useEffect } from "react";
import axios from "axios";

interface Film {
    cim: string;
    rendezo: string;
    kiadasEve: string;
    mufaj: string;
    id: number;
}

function Filmek(){
const [filmek, setFilmek] = useState<Film[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
const random = true; 

useEffect(() => {
 const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/filmek");
            if (response.status !== 200) {
                throw new Error("Hiba történt az adatok betöltésekor.");
            }
            setFilmek(response.data);
        
        } catch (error) {
            setError("Hiba történt az adatok betöltésekor.");
          
        } finally{
            setLoading(false);
        }
    };
    fetchData();
}, []);

return(
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
            <td>{film.kiadasEve}</td>
            <td>{film.mufaj}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3>Film lista sorszámozott listában</h3>
      <ol className="list-group">
        {filmek.map((film, index) => {
          const colors = ["primary", "success", "info", "warning", "danger", "secondary"];
          const color = colors[index % colors.length];
          return (
            <li key={index} className="list-group-item">
              <div><strong className={`text-${color}`}>{film.cim}</strong></div>
              <div><strong className={`text-${color}`}>Rendező:</strong> {film.rendezo}</div>
              <div><strong className={`text-${color}`}>Év:</strong> {film.kiadasEve}</div>
              <div><strong className={`text-${color}`}>Műfaj:</strong> {film.mufaj}</div>
            </li>
          );
        })}
      </ol>
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
                <p><strong>Év:</strong> {film.kiadasEve}</p>
                <p><strong>Műfaj:</strong> {film.mufaj}</p>
                {random && <button className={`btn btn-${color} mt-2`}>További információ</button>}
              </div>
            </div>
          );
        })}
      </div>
  </div>
  
       
 
  
)



}
export default Filmek;