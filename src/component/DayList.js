import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function DayList(){
    const [days, setDays] = useState();
    

    return <ul className='list_day'>
        {dummy.days.map(
            day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>
                        Day {day.day}
                    </Link>
                </li>
            )
        )} 
    </ul>
}