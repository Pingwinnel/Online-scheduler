import React from 'react';
import {useDispatch} from "react-redux";
import {nextMonthHandler, prevMonthHandler} from "../../../../store/calendarSlice";


const Controls = () => {
    const dispatch=useDispatch();
    return (
        <div className="buttons">
            <i className="bx bx-chevron-left" onClick={() => dispatch(prevMonthHandler())}></i>
            <i className="bx bx-chevron-right" onClick={() => dispatch(nextMonthHandler())}></i>
        </div>
    );
};

export default Controls;