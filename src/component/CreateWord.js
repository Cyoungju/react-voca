import { useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch"

export default function CreateWord(){
    const days = useFetch('http://localhost:3001/days')
    const navigate = useNavigate(); 
    const [isLoding, setLoding] = useState(false);

    function onSubmit(e){
        e.preventDefault();

        //console.log(engRef.current.value) //current를 이용해 value값 가지고 올수 있음
        if(!isLoding){ 
            setLoding(true)
            fetch(`http://localhost:3001/words/`,{            
                method : 'POST',
                header : {
                    'Content-Type' : 'applacation/json',
                },
                body : JSON.stringify({
                    day : dayRef.current.value,
                    eng : engRef.current.value,
                    kor : korRef.current.value,
                    isDone : false
                }) // json 데이터로 받아오기
            }).then(res =>{
                alert("생성이 완료되었습니다.");
                navigate(`/day/${dayRef.current.value}`)
                setLoding(false)
            }) 
        }

    }

    const engRef = useRef(null) //돔에 접근
    const korRef = useRef(null)
    const dayRef = useRef(null)

    return <form onSubmit={onSubmit}>
        <div className="input_area">
            <label>Eng</label>
            <input type="text" placeholder="conmuter" ref={engRef}/>
        </div>
        <div className="input_area">
            <label>Kor</label>
            <input type="text" placeholder="컴퓨터" ref={korRef}/>
        </div>

        <div className="input_area">
            <label>Day</label>
            <select ref={dayRef}>
                {days.map(_day => (
                    <option key={_day.id} value={_day.day}>{_day.day}</option>
                ))} 
            </select>
        </div>
        <button
            style={{
                opacity : isLoding ? 0.3 : 1
            }}
        >{isLoding ? "saving..." : "저장"}</button>
    </form>
}