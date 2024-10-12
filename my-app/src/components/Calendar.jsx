import React, {useState} from 'react';
import classes from './Calendar.css';
import moment from "moment";

const Calendar = () => {
    moment.locale('en',{week:{dow:1}});
    const daysArray = [...Array(30)];
    const [today, setToday] = useState(moment());
    const startDay=today.clone().startOf('month').startOf('week');


    const prevHandler=()=>{
        setToday(prev=>prev.subtract(1,'month'));
    }
    const todayHandler=()=>{
        setToday(prev=>prev.subtract(1,'month'));
    }
    const nextHandler=()=>{
        setToday(prev=>prev.add(1,'month'));
    }
    return (
        <div className={"calendar-app"}>
            <div className="calendar">
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">October,</h2>
                    <h2 className="year">2024</h2>
                    <div className="buttons">
                        <i className="bx bx-chevron-left" onClick={prevHandler}></i>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
                <div className="weekdays">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WEN</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN</span>
                </div>
                <div className="days">
                    {
                        daysArray.map((value, index) =>
                                (
                                    <span className={""}>{index + 1}</span>
                                )
                        )
                    }
                </div>
            </div>
            <div className="events">
                <div className="event-popup">
                    <div className="time-input">
                        <div className="event-popup-time">Time</div>
                        <input type={'number'} name={'hours'} min={0} max={24} className={'hours'}/>
                        <input type={'number'} name={'hours'} min={0} max={60} className={'minutes'}/>
                    </div>
                    <textarea placeholder={"Enter Event Text (Maximum 60 Characters"}></textarea>
                    <button className={'event-popup-btn'}>Add Event</button>
                    <button className="close-event-popup"><i className="bx bx-x"></i></button>
                </div>
                <div className="event">
                    <div className="event-date-wrapper">
                        <div className="event-date">May 15,2024</div>
                        <div className="event-time">10:00</div>
                    </div>
                    <div className="event-text">Meeting with Friends</div>
                    <div className="event-buttons">
                        <i className="bx bx-edit-alt"></i>
                        <i className="bx bx-message-alt-x"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;