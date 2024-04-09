import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch"

export default function(){
    const days = useFetch('http://localhost:3001/days')
    const navigate = useNavigate(); 
    function addDay(e){
        e.preventDefault();
        fetch(`http://localhost:3001/days/`,{            
            method : 'POST',
            header : {
                'Content-Type' : 'applacation/json',
            },
            body : JSON.stringify({
                id : days.length+1,
                day : days.length+1
            })  
        }).then(res =>{
            alert("생성이 완료되었습니다.");
            navigate(`/`)
        }) 
    }
    return <div>
       <h2>전체일수 : {days.length}일</h2>
       <button onClick={addDay} className="link">Day추가</button> 
    </div>
}