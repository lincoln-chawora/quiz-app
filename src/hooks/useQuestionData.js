import {useEffect} from "react";

export function useQuestionData(dispatch) {
    useEffect(() => {
        const controller = new AbortController();

        async function getQuestions() {
            try {
                const response = await fetch('http://localhost:8000/questions', {signal: controller.signal});

                if (!response.ok) throw new Error('Something went wrong with fetching questions.');

                return await response.json();
            } catch (error) {
                dispatch({type: 'dataFailed', payload: error})
            }
        }

        async function getScore(questionData) {
            try {
                const response = await fetch('http://localhost:8000/score/1', {signal: controller.signal});

                if (!response.ok) {
                    dispatch({type: 'dataReceived',payload: {questions: questionData}})
                    throw new Error('Something went wrong with fetching score.');
                }

                const scoreData = await response.json();
                dispatch({type: 'dataReceived', payload: { questions: questionData, score: scoreData.highscore }})
            } catch (error) {
                console.log(error);
            }
        }

        getQuestions().then((res) => getScore(res));

        // Clean up function which aborts requests to help prevent a race condition where multiple of the same requests
        // are executed at once, in some cases an earlier request might complete before the last one, causing incorrect
        // data to be received. Aborting the request stops this from happening by allowing only the last request to go
        // through.
        return () => {
            controller.abort();
        }
    }, [dispatch]);

}