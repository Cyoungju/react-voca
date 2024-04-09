//import dummy from "../db/data.json"; 
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.ts';
import Word, { IWord } from "./Word.tsx";
 
export default function Day(){
    const { day } = useParams<{day : string}>(); //주소창에 있는 Params이 들어옴 
    const words : IWord[] = useFetch(`http://localhost:3001/words?day=${day}`) 

    return <>
    <h2>Day {day}</h2>
        {words.length === 0 && <span>Loding...</span>}
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