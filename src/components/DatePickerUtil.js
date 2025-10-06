const COLUMNS =[
    {
        'label': 'Su',
        'value': 'Sunday'
    },
    {
        'label': 'Mo',
        'value': 'Monday'
    },
    {
        'label': 'Tu',
        'value': 'Tuesday'
    },
    {
        'label': 'We',
        'value': 'Wednesday'
    },
    {
        'label': 'Th',
        'value': 'Thursday'
    },
    {
        'label': 'Fr',
        'value': 'Friday'
    },
    {
        'label': 'Sa',
        'Value': 'Saturday'
    }
];

const MONTHS = [
    'January',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const getNumberOfDaysInMonth = (date) => {
    // Create a copy so original 'date' is not mutated
    const d = new Date(date);

    // Move to the first day of the next month, then go back one day
    d.setMonth(d.getMonth() + 1, 0);

    // The "0th" day of next month is the last day of the current month
    return d.getDate();
}

const getNumberOfRowsInTheTable = (firstDay, noOfDaysInMonth) => {
    return Math.ceil((noOfDaysInMonth + firstDay) / 7);
}

const getDates = (date) => {
    // let date = new Date();
    let dateTable = [];
    let curDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let curMonth = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getMonth();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let noOfDaysInMonth = getNumberOfDaysInMonth(date);
    let noOfRowsInTheTable = getNumberOfRowsInTheTable(firstDay, noOfDaysInMonth);
    let i, j;
    // constructing an empty Date Table.
    for (i = 0; i < noOfRowsInTheTable; i++) {
        let tempRow = [];
        for (j = 0; j < 7; j++) {
            tempRow.push({
                label: '.',
                value: '.'
            })
        }
        dateTable.push(tempRow);
    }
    i = 0;
    j = firstDay;
    while (curDate.getMonth() === curMonth) {
        dateTable[i][j] = {
            label: curDate.getDate(),
            value: curDate
        }
        // incrementing the date to next date.
        // creating a new Date instead of using the same variable 
        // because in javascript, variables are passed by Reference
        curDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1);
        if (++j === 7) {
            j = 0;
            i++;
        }
    }
    dateTable = [COLUMNS, ...dateTable];
    let dateData = {
        'dateTable': dateTable,
        'monthName': getCurrentMonth(date),
        'year': date.getFullYear()
    }
    return dateData;
}

const getCurrentMonth = (date) => {
    // let date = new Date();
    return MONTHS[date.getMonth()];
}

export { getDates }