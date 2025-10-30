import { useEffect, useRef, useState } from 'react'

import './quiz.scss'

import { data } from '../../assets/questions'

const Quiz = () => {
    const [questions, setQuestions] = useState(data)
    const [index, setIndex] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [answerSelected, setAnswerSelected] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    const [answersGiven, setAnswersGiven] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [сomplete, setComplete] = useState(false)

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
                setCorrectAnswers(prev => prev + 1)
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
            setAnswersGiven(prev => prev + 1)
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
        if(сomplete) {
            return(
                <>
                    <span>Ответов дано на {answersGiven} вопросов.</span>
                    <span>Из {answersGiven} вопросов, правильных {correctAnswers}</span>
                </> 
            )
        } else {
            return(
                <>
                    <h2>{question}</h2>
                    <ul>
                        {answers}
                    </ul>
                </> 
            )
        }
    }      

    const сompleteQuiz = () => {
        setComplete(true)
    }
    const startAgain = () => {
        setComplete(false)
        setIndex(0)
    }

    const goToQuestion = () => {
        if(inputValue && inputValue <= questions.length) {
            setIndex(Number(inputValue - 1))
            setInputValue('')
        } 
    }
    
    const inputChange = (value) => {
        setInputValue(value)
    }

    return (
        <div className="container">
            <h1>QUIZ APP</h1>
            <hr />
                {renderQuestion()}
            <div className='buttons'>
                {сomplete ? <button onClick={startAgain}>Начать сначала</button>: <button onClick={сompleteQuiz}>Завершить</button>}
                {lastQuestion || сomplete ? null : <button onClick={changeQuestion}>Следующий</button>}    
            </div>
            {сomplete ? null : <div className="input-group">
                <input type="text" 
                       className="input no-spinners"
                       placeholder='Номер вопроса'
                       value={inputValue}
                       onKeyDown={(e) => {if (e.key === 'Enter') goToQuestion()}}
                       onChange={e => {
                        const value = e.currentTarget.value
                        const digitsOnly = value.replace(/\D/g, '')
                        inputChange(digitsOnly)}}/>
                <input className="button--submit" 
                       value="Перейти" 
                       type="submit"
                       onClick={goToQuestion}/>
            </div>}
            {сomplete ? null : <div className='index'>{index + 1} из {questions.length} вопросов</div>}
        </div>
    )
}

export default Quiz
