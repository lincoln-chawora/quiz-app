export const initialState = {
    questions: [],
    status: 'loading', // Available statuses: loading, error, ready, active, finished
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
};

export default (state, action) => {
    switch (action.type) {
        case 'dataReceived':
            console.log('Received');
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
        case 'newAnswer':
            const question = state.questions.at(state.index);
            const questionPoints = question.points;

            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + questionPoints : state.points
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index++,
                answer: null,
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