// import {shuffleArray} from './utils';

export const fetchPetShops= async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const endpoint = `http://127.0.0.1:8000/canils/`;
    const data = await (await fetch(endpoint)).json();

    return data;
    console.log(data);
    // return data.results.map((question: Question) => ({
    //         ...question,
    //         answers: shuffleArray([
    //             ...question.incorrect_answers, 
    //             question.correct_answer,
    //         ]),
    //     }));

    
};