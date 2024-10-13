import React from 'react';

import moment from "moment";

const DayGridControler = ({ currentYear,
                              firstDayOfMonth,
                              daysInMonth,
                              currentDate,currentMonth,
                              handleDayClick}) => {

    return (
        <div className="days">
            {[...Array(firstDayOfMonth).keys()].map((_,index) =>
                (<span key={`empty-${index}`}/>
            ))}
            {[...Array(daysInMonth).keys()].map((day)=>
                <span key={day+1}
                      className={day+1===currentDate.getDate()
                      &&
                      currentMonth=== currentDate.getMonth()+1
                      &&
                      currentYear===currentDate.getFullYear()
                          ?
                          'current-day'
                          :
                          '' }
                      onClick={()=>handleDayClick(day+1)}
                >{day+1}
                </span>)}
        </div>
    );
};

export default DayGridControler;