import { useState, useEffect } from 'react';

export default function useFetch(url : string){
    const [data, setData] = useState([]) //빈배열 넣어줌

    useEffect(() => {
        fetch(url) 
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setData(data)
        })
    }, [url])

    return data;
}