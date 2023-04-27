import {useState, useEffect} from 'react';

const useFetch = (url) => {

    const[data, setData] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setData(data)
        });
        
        return () => abortCont.abort();

    }, [url]);
    
    return {data}
}

export default useFetch;