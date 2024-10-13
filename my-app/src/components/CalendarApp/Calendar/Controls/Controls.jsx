import React from 'react';


const Controls = ({
                      prevMonthHandler,
                      nextMonthHandler
                  }) => {
    return (
        <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonthHandler}></i>
            <i className="bx bx-chevron-right" onClick={nextMonthHandler}></i>
        </div>
    );
};

export default Controls;