const monthNames = [
    'January',
    'February', 
    'March', 
    'April', 
    'May', 
    'June',
    'July',
    'August', 
    'September', 
    'October', 
    'November', 
    'December',
];

const dayNames = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
]

export const monthToString = (month) => {
    return monthNames[month];
}

export const dateToString = (d) => {
    const day = dayNames[d.getDay()];
    const date = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const hour = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    const sec = d.getSeconds().toString().padStart(2, '0');

    return `${day}, ${date} ${month} ${year} - ${hour}:${min}:${sec}`;
}