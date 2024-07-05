export const initialState = {
    questions: [],
    status: 'loading', // Available statuses: loading, error, ready, active, finished
    index: 0,
    answers: [],
    points: 0,
    highscore: 0,
};

export default function quizReducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload.questions ? action.payload.questions : state.questions,
                highscore: action.payload.score ? action.payload.score : state.highscore,
                status: 'ready'
            }
        case 'start':
            return {
                ...state,
                status: 'active',
            }
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                highscore: state.highscore
            }
        case 'questionAnswered':
            const question = state.questions.at(state.index);
            const questionPoints = question.points;
            const correctAnswer = question.options[question.correctOption];

            return {
                ...state,
                answers: [...state.answers, action.payload],
                points: action.payload === correctAnswer ? state.points + questionPoints : state.points
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
            }
        case 'previousQuestion':
            return {
                ...state,
                index: state.index - 1,
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore: state.highscore < state.points ? state.points : state.highscore
            }
        default:
            throw new Error('Invalid action')
    }
}