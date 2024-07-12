import {createContext, useContext, useReducer} from "react";
import quizReducer, {initialState} from "../reducers/quizReducer";
import {useQuestionData} from "../hooks/useQuestionData";

const QuizContext = createContext();

function QuizProvider({children}) {
    const [{questions, status, index, answers, points, highscore}, dispatch] = useReducer(quizReducer, initialState);
    useQuestionData(dispatch);
    const numberOfQuestions = questions.length;
    const lastQuestion = numberOfQuestions === index + 1;
    const maxPossiblePoints = questions.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0);

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            numberOfQuestions,
            answers,
            points,
            highscore,
            maxPossiblePoints,
            dispatch,
            index,
            lastQuestion,
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuizContext() {
    const context = useContext(QuizContext);

    if (context === undefined) throw Error('Quiz context was used outside of post provider.');

    return context;
}

export {QuizProvider, useQuizContext};