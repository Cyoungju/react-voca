//import dummy from "../db/data.json";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Word from "./Word";

export default function Day(){
    const day = useParams().day; //주소창에 있는 Params이 들어옴 
    const words = useFetch(`http://localhost:3001/words?day=${day}`) 

    return <>
    <h2>Day {day}</h2>
        <table>
            <tbody>
                {words.map(word =>(
                        <Word word={word} key={word.id} />
                    ) 
                )}
            </tbody> 
        </table>
    </>
}