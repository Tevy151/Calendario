import React, { useState } from 'react';
import estilo from "../styles/style.css";
import Axios from 'axios';

const Home = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const now = new Date();
  const initialMonth = now.getMonth();
  const initialMonthDay = daysInMonth(initialMonth, now.getFullYear());

  const [month, setMonth] = useState(initialMonth);
  const [monthDay, setMonthDay] = useState(initialMonthDay);
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [id, setId] = useState('1');
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Evaluacion');
  const [asignatura, setAsignatura] = useState('mate');
  const [dia, setDia] = useState('hoy');

  const prev = () => {
    if (month > 0) {
      setMonth(month - 1);
      setMonthDay(daysInMonth(month - 1, now.getFullYear()));
    }
  };

  const next = () => {
    if (month < 11) {
      setMonth(month + 1);
      setMonthDay(daysInMonth(month + 1, now.getFullYear()));
    }
  };

  const add = (e) => {
    e.preventDefault();
    const newEvent = {
      id,
      asignatura,
      description,
      tipo: type,
      dia,
    };
    console.log(newEvent);

    Axios.post('http://localhost:3001/AddEvaluacion', newEvent)
      .then(response => {
        // El evento se ha agregado con éxito, puedes actualizar el estado u realizar otras acciones
        setEvents([...events, response.data]);
        setDescription('');
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Error al agregar el evento:', error);
      });
  };

  return (
    <div>
      <link href={estilo} rel="stylesheet" />
      <div className="calendar">
        <div className="calendar_left">
          <div className="header">
            <i className="material-icons" onClick={prev}><h1>&lt;</h1></i>
            <h1>{months[month]}</h1>
            <i className="material-icons" onClick={next}><h1>&gt;</h1></i>
          </div>
          <div className="days">
            <div className="day_item">Mon</div>
            <div className="day_item">Tue</div>
            <div className="day_item">Wed</div>
            <div className="day_item">Thu</div>
            <div className="day_item">Fri</div>
            <div className="day_item">Sat</div>
            <div className="day_item">Sun</div>
          </div>
          <div className="dates">
            {Array.from({ length: monthDay }, (_, index) => (
              <div
                key={index}
                className={`date_item ${index + 1 === selectedDate ? 'present' : ''}`}
                onClick={() => setSelectedDate(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar_right">
          <div className="list">
            <ul>
              {events.map(event => (
                event.id === `${selectedDate}${month}` && (
                  <li key={event.id} className="bounce-in">
                    <span className="type">{event.tipo} de</span>
                    <span className="description">{event.description}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
          <form onSubmit={add}>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Asignatura"
              type="text"
            />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="Evaluacion">Evaluación</option>
              <option value="Entrega">Entrega</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
