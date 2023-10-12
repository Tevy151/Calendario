import React, { useState } from 'react';
import '../styles/Home.css';
import estilo from "../styles/style.css";

const Home = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate() + 1;

  const now = new Date();
  const initialMonth = now.getMonth();
  const initialMonthDay = daysInMonth(initialMonth + 1, now.getFullYear());

  const [month, setMonth] = useState(initialMonth);
  const [monthDay, setMonthDay] = useState(initialMonthDay);
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Social');

  const prev = () => {
    if (month > 0) {
      setMonth(month - 1);
      setMonthDay(daysInMonth(month, now.getFullYear()));
    }
  };

  const next = () => {
    if (month < 11) {
      setMonth(month + 1);
      setMonthDay(daysInMonth(month + 2, now.getFullYear()));
    }
  };

  const add = () => {
    setEvents([
      ...events,
      {
        id: `${selectedDate}${month}`,
        description,
        type,
      },
    ]);
    setDescription('');
  };

  return (
    <div>
      <link href={estilo} rel="stylesheet" />
      <div className="calendar">
        <div className="calendar_left">
          <div className="header">
            <i className="material-icons" onClick={prev}>navigate_before</i>
            <h1>{months[month]}</h1>
            <i className="material-icons" onClick={next}>navigate_next</i>
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
                    <span className="type">It's a {event.type} thing -</span>
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
              placeholder="Enter a task for this day"
              type="text"
            />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="Social">Social</option>
              <option value="Work">Work</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
