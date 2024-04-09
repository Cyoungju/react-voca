import { useState } from "react"

export default function Word(/*props*/ {word : w}){ //새로운 변수명으로 할당 - props로 받은 word를 w라는 변수명으로 사용
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone)
    function toggleshow(){
        setIsShow(!isShow);
    }
    function toggleDone(){
        //setIsDone(!isDone);
        fetch(`http;//localhost:3001/words/${word.id}`,{
            method : 'PUT',
            header : {
                'Content-Type' : 'applacation/json',
            },
            body : JSON.stringify({
                ...word, // 기존데이터
                isDone : !isDone
            }) // json 데이터로 받아오기
        }).then(res =>{
            setIsDone(!isDone);
        })
    }

    function del(){
        if(window.confirm('삭제 하시겠습니까?')){
            fetch(`http;//localhost:3001/words/${word.id}`,{
                method : 'DELETE',
            }).then(res=>{
                if(res.ok){
                    setWord({id:0})
                }
            })
        }
    }

    if(word.id === 0){
        return null;
    }

    return(
    <tr className={isDone ? "off" : ""}>
        <td><input type="checkbox" checked={isDone} onChange={toggleDone}/></td>
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td>
            <button onClick={toggleshow}>뜻 {isShow ? '숨기기' : '보기'}</button>
            <button className="btn_del" onClick={del}>삭제</button>
        </td>
    </tr>
    )
}