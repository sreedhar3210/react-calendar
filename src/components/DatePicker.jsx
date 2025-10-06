import React, { useEffect, useState } from 'react'
import '../css/DatePicker.css'
import { getDates } from './DatePickerUtil';
import YearsDropdown from './YearsDropdown';

function DatePicker() {

    const getFirstDayOfThisMonth = () => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    }

    const [curDate, setCurDate] = useState(getFirstDayOfThisMonth);
    const [rows, setRows] = useState([]);
    const [monthName, setMonthName] = useState('');

    const getCurrentYear = () => {
        return curDate.getFullYear();
    }

    const [year, setYear] = useState(getCurrentYear);
    const [showYearsDropdown, setShowYearsDropdown] = useState(false);

    const handleInitialization = () => {
        let dateData = getDates(curDate);
        setRows(dateData.dateTable);
        setMonthName(dateData.monthName);
        setYear(dateData.year);
    }

    const handleGotoPreviousMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1));
    }

    const handleGotoNextMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1));
    }

    const handleYearsDropdown = () => {
        setShowYearsDropdown(prev => !prev);
    }

    const handleYearChange = (newYear) => {
        setCurDate(new Date(newYear, curDate.getMonth(), 1));
    }

    const handleDateClick = (rowIndex, date) => {
        if (rowIndex !== 0) {
            console.log('>>>> date selected is: ', date);
        }
    }

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, [curDate]);

  return (
    <div className="datepicker-wrapper">
        <div className="datepicker-card">
            <div className="datepicker-header">
                <span className="nav-arrow" onClick={handleGotoPreviousMonth}>&lt;</span>
                <div className="month-year">
                    <span className="month-name">{monthName}</span>
                    <span className="year-name" onClick={handleYearsDropdown}>
                        {year} ▼
                        {showYearsDropdown && (
                            <div className="years-dropdown-container">
                                <YearsDropdown year={year} onYearSelect={handleYearChange} />
                            </div>
                        )}
                    </span>
                </div>
                <span className="nav-arrow" onClick={handleGotoNextMonth}>&gt;</span>
            </div>

            <div className="table">
                {rows.map((row, rowIndex) =>
                    row.map((column, columnIndex) => (
                        <div
                            key={`${rowIndex}-${columnIndex}`}
                            className={`cell 
                                ${rowIndex === 0 ? 'day-cell' : (column.label === '.' ? 'inactive-cell' : 'active-cell')}
                            `}
                            onClick={() => handleDateClick(rowIndex, column.value)}
                        >
                            {column.label}
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default DatePicker
