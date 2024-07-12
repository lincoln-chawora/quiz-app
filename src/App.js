import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import FinishedScreen from "./components/FinishedScreen";
import {useQuizContext} from "./contexts/QuizProvider";
import {QuizBody} from "./components/QuizBody";

export default function App() {
    const {status} = useQuizContext();

    return (
      <div className="app">
        <Header />
          <Main>
              {status === 'loading' && <Loader />}
              {status === 'error' && <ErrorMessage />}
              {status === 'ready' && <StartScreen />}
              {status === 'active' &&
                  <QuizBody />
              }
              {status === 'finished' && <FinishedScreen />}
          </Main>
      </div>
  )
}
