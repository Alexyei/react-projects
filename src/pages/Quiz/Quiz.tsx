import {FC, useRef, useState} from "react";
import classes from "./Quiz.module.scss"

type Question = {
    question: string,
    variants:string[],
    answer:number
}

const Result:FC<{rightAnswersCount:number, questionsCount:number, onClick:()=>void}> = ({rightAnswersCount,questionsCount, onClick})=>{
    return (
        <div className={classes.result}>
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>Верных ответов: {rightAnswersCount} из {questionsCount}</h2>
            <button onClick={onClick}>Попробовать снова</button>
        </div>
    )
}

const Step:FC<{question:Question, progress:number, onAnswer:(answer:number)=>void}> = ({question,progress,onAnswer})=>{
    return (
        <>
            <div className={classes.progress__bar}>
                <div style={{width: `${progress*100}%`}} className={classes.progress__bar__inner}/>
            </div>
            <h1>{question.question}</h1>
            <ul>
                {
                    question.variants.map((el,index)=><li key={index} onClick={()=>onAnswer(index)}>{el}</li>)
                }
            </ul>
        </>
    )
}

const useMultiStepForm = <Step,>(steps:Step[])=>{
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        progress: (currentStepIndex+1)/steps.length,
        goTo,
        next,
        back,
    }
}

const Quiz:FC<{
    questions: Question[],
    onStepChanged?: (nextStep:number,questions:Question[],progress:number,answers:number[])=>void,
    onFinish?: (answers:number[], questions:Question[])=>void
}> = ({questions,onFinish,onStepChanged}) => {

    // const [step, setStep] = useState(0)
    // const isFinish = useMemo(()=>step>=questions.length,[step])
    const [answers, setAnswers] = useState<number[]>([])

    const [isFinish,setIsFinish] = useState(false)
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo,progress} = useMultiStepForm(questions)

    function getRightAnswersCount(answers:number[], questions:Question[]){
        return questions.reduce((sum,curr,currIndex)=>curr.answer == answers[currIndex]?sum+1:sum,0);
    }

    function resetQuiz(){
        goTo(0);
        setAnswers([]);
        setIsFinish(false);
    }

    function onAnswerHandler(answer:number){
        setAnswers(prev=>[...prev,answer])

        if (isLastStep){
            setIsFinish(true);
            if (onFinish) onFinish(answers,questions);
        }else{
            if (onStepChanged) onStepChanged(currentStepIndex+1,questions,progress,answers);
        }

        next()
    }

  return (
      // <div className={classes.form__container}>
      <div className={classes.form}>
          {isFinish ? <Result rightAnswersCount={getRightAnswersCount(answers,questions)} questionsCount={questions.length} onClick={resetQuiz}/> : <Step progress={progress} question={step} onAnswer={onAnswerHandler}/>}
      </div>
    // <div className={classes.first__shadow}/>
    // <div className={classes.second__shadow}/>
    //   </div>
  )
}

const questions = [
    {
        question: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        answer: 0,
    },
    {
        question: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        answer: 1,
    },
    {
        question: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        answer: 2,
    },
];

const QuizExample:FC = () => {
    return (
        <div className={classes.container}>
            <Quiz questions={questions} onFinish={()=>alert("FINISH!")}/>
        </div>
    )
}

export default QuizExample;