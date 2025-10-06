import React, { useState } from 'react';
import '../css/YearsDropdown.css';

function YearsDropdown({ year, onYearSelect }) {

    const [selectedYear, setSelectedYear] = useState(year);

    const yearList = () => {
        let years = [];
        for (let curYear = year - 100; curYear <= year + 100; curYear++) {
            years.push(curYear);
        }
        return years;
    };

    const handleYearClick = (curYear) => {
        setSelectedYear(curYear);
        if (onYearSelect) onYearSelect(curYear); // call parent function if provided
    };

    return (
        <div className="years-dropdown">
            {yearList().map((curYear) => (
                <div
                    key={curYear}
                    className={`year-item ${curYear === selectedYear ? 'selected' : ''}`}
                    onClick={() => handleYearClick(curYear)}
                >
                    {curYear}
                </div>
            ))}
        </div>
    );
}

export default YearsDropdown;
