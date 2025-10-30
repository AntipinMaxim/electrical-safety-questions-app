import { useEffect, useRef, useState } from 'react'

import './quiz.scss'

import { data } from '../../assets/questions'

const Quiz = () => {
    const [questions, setQuestions] = useState(data)
    const [index, setIndex] = useState(0)
    const [answerSelected, setAnswerSelected] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)

    const answerRefs = useRef([])

    useEffect(() => {
        answerRefs.current.forEach((ref) => {
            if (ref) ref.style.backgroundColor = ''
        })
        setAnswerSelected(false)
    }, [index])

    const checkAnsw = (i) => {
        if(!answerSelected) {
            answerRefs.current.forEach((ref) => {
                if(ref) {
                    ref.style.backgroundColor = ''
                }
            })

            const correctIndex = questions[index].ans - 1

            if(i === correctIndex) {
                answerRefs.current[i].style.backgroundColor = 'green'
            } else {
                answerRefs.current.forEach((ref) => {
                    if(ref) {
                        ref.style.backgroundColor = 'red'
                        answerRefs.current[correctIndex].style.backgroundColor = 'green'
                    }  
                })
            }
            setAnswerSelected(true)
            if(index + 1 === questions.length) {
                setLastQuestion(true)
            }
        }
    }

    const changeQuestion = () => {
        if(answerSelected && index + 1 < questions.length) {
            setIndex(prev => prev + 1)
        }
    }

    const renderQuestion = () => {
        const question = questions[index].question
        const answers = questions[index].answ.map((item, i) => {
            return(
                <li key={i}
                    ref={(el) => (answerRefs.current[i] = el)}
                    onClick={() => checkAnsw(i)}>{item.option}
                </li>
            )
        })
        return(
            <>
                <h2>{question}</h2>
                <ul>
                    {answers}
                </ul>
            </> 
        )
    }      


    return (
        <div className="container">
            <h1>QUIZ APP</h1>
            <hr />
                {renderQuestion()}
            {lastQuestion ? <button onClick={changeQuestion}>Результат</button> : <button onClick={changeQuestion}>Следующий</button>}
            <div className='index'>{index + 1} из {questions.length} вопросов</div>
        </div>
    )
}

export default Quiz
