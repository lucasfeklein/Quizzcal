import React from "react"
import Question from './Question'
import {nanoid} from 'nanoid'

export default function App (){
    
    const [quizData, setQuizData] = React.useState([])
    const [start, setStart] = React.useState(false)
    const [checkResults, setCheckResults] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [playAgain, setPlayAgain] = React.useState(false)
    
    React.useEffect (() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986')
            .then (res => res.json())
            .then (data => setQuizData(() => {
                return data.results.map( result => {
                    const question = decodeURIComponent(result.question)
                    const correctAnswer = result.correct_answer
                    const sortedChoices = [...result.incorrect_answers, correctAnswer].sort()
                    const id = nanoid()
                    const choicesProperties = sortedChoices.map(choice => {
                        return {
                            choice: decodeURIComponent(choice),
                            id: nanoid(),
                            questionId: id,
                            isSelected: false,
                            isRight: correctAnswer === choice ? true : false
                        }
                    })
                    
                    return {
                        question: question,
                        correctAnswer: correctAnswer,
                        id: id,
                        choicesProperties: choicesProperties
                    }
                })
            }))
    }, [playAgain])
    
    function selectAnswer(questionId, id){
        setQuizData (result => {
           return result.map( question => {
               if (questionId === question.id){
                   return {
                       ...question, 
                       choicesProperties: question.choicesProperties.map(choice => {
                           if (id === choice.id) {
                               return {...choice, isSelected: true}
                           } else {
                               return {...choice, isSelected: false}
                           }
                       })
                       }
               } else {
                   return question
               }
           })
        })
    }
    
    function startQuiz(){
        setStart(prevStart => !prevStart)
    }
    
    function handleCheck(){
        if (!checkResults) {
            setCheckResults(true)
            quizData.forEach(question => {
                question.choicesProperties.forEach(choice => {
                    if (choice.isSelected && choice.isRight){
                        setCount(prevCount => prevCount + 1)
                    }
                })
            })
        } else {
            setCheckResults(false)
            setCount(0)
            setPlayAgain(!playAgain)
        }
    }
    
    const startElement = (
        <div className='start-container'>
            <h1>Quizzical</h1>
            <p>Some desciption if needed</p>
            <button onClick={startQuiz}>Start quiz</button>
        </div>    
    )
    
    const questionElements = quizData.map( result => {
        return (
            <Question
                key={result.id}
                questionId={result.id}
                question={result.question}
                choicesProperties={result.choicesProperties}
                selectAnswer={selectAnswer}
                checkResults={checkResults}
            />
        )
    })
     
    return (
        <main>
            {!start ? startElement : questionElements}
            {checkResults && <p>You scored {count}/5 correct answers</p>}
            {start && <button onClick={handleCheck} className='check-btn'>{!checkResults ? 'Check Results' : 'Play Again'}</button>}
        </main>
    )
}
