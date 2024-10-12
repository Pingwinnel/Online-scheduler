import React from 'react';

const Header = ({CurrentYear,CurrentMonth}) => {
    const monthsOfYear=["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return (
        <div>
            <h1 className="heading">Calendar</h1>
            <div className="navigate-date">
                <h2 className="month">{monthsOfYear[CurrentMonth-1]},</h2>
                <h2 className="year">{CurrentYear}</h2>
            </div>
        </div>
    );
};

export default Header;