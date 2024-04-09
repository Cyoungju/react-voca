import React, { useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch.ts"
import { IDay } from "./DayList.tsx"; 

export default function CreateWord(){
    const days : IDay[] = useFetch('http://localhost:3001/days') 
    const navigate = useNavigate(); 
    const [isLoding, setLoding] = useState(false);

    function onSubmit(e : React.FormEvent){
        e.preventDefault();

        //console.log(engRef.current.value) //current를 이용해 value값 가지고 올수 있음
        if(!isLoding
            && dayRef.current && engRef.current && korRef.current){ 
            setLoding(true)

            const day = Number(dayRef.current.value);
            const eng = engRef.current.value;
            const kor = korRef.current.value;

            fetch(`http://localhost:3001/words/`,{            
                method : 'POST',
                headers : {
                    "Content-Type" : "applacation/json",
                },
                body : JSON.stringify({  
                    day ,
                    eng,
                    kor, 
                    isDone : false
                }) // json 데이터로 받아오기
            }).then(res =>{
                alert("생성이 완료되었습니다.");
                navigate(`/day/${day}`)
                setLoding(false)
            }) 
        }

    }

    const engRef = useRef<HTMLInputElement>(null) //돔에 접근
    const korRef = useRef<HTMLInputElement>(null)
    const dayRef = useRef<HTMLSelectElement>(null)

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