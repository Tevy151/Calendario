import React, { useEffect, useState } from 'react';
import estilo from "../styles/style.css";
import Axios from 'axios';
import axios from 'axios';

const Home = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const now = new Date();
  const initialMonth = now.getMonth();
  const initialMonthDay = daysInMonth(initialMonth, now.getFullYear());
  const diaa = new Date(now.getFullYear(), 0, 0)

  const [month, setMonth] = useState(initialMonth);
  const [monthDay, setMonthDay] = useState(initialMonthDay);
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [id, setId] = useState(0);
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Evaluacion');
  const [asignatura, setAsignatura] = useState('');
  const [dia, setDia] = useState(Math.floor((now - diaa) / (1000 * 60 * 60 * 24)));

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
    const newEvent = {
      id: (events.length + 1).toString(),
      asignatura,
      description,
      tipo: type,
      dia: dia.toString(),
    };
    console.log(newEvent);

    Axios.post('http://localhost:3001/AddEvaluacion/', newEvent)
      .then(response => {
        // El evento se ha agregado con éxito, puedes actualizar el estado u realizar otras acciones
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Error al agregar el evento:', error);
      });
      setId(id+1);
      setAsignatura('');
      setDescription('');
      
  };

  function diaDelAnio(mes2, dia2) {
    var diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (mes2 < 1 || mes2 > 12 || dia2 < 1 || dia2 > diasPorMes[mes2 - 1]) {
      return "Fecha no válida";
    }
  
    var diaDelAnio = 0;
    for (var i = 0; i < mes2 - 1; i++) {
      diaDelAnio += diasPorMes[i];
    }
    diaDelAnio += dia2;
  
    return diaDelAnio;
  }

  const newday = (index) => {
    setSelectedDate(index + 1);
    setDia(diaDelAnio(month+1,index + 1));
  };

  useEffect(() => {
    getEvents();
  },[]);

  const getEvents = () => {
    axios.get('http://localhost:3001/Eventos/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }
  
  

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
                onClick={() => newday(index)}
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
                parseInt(event.dia) === diaDelAnio(month+1,selectedDate) && (
                  <li key={event.id} className="bounce-in">
                    <span className="type">{event.tipo} de </span>
                    <span className="asignatura">{event.asignatura}<br></br>{event.description}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
          <form onSubmit={add}>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="descripción"
              type="text"
            />
            <input
              value={asignatura}
              onChange={e => setAsignatura(e.target.value)}
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
