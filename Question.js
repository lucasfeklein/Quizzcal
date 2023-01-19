import React from "react"

export default function Question({questionId, question, choicesProperties, selectAnswer, checkResults}){   
    
    return (
        <section>
            <h2>{question}</h2>
            <div className='choices-container'>
                <p style={{backgroundColor: checkResults && choicesProperties[0].isRight? '#94D7A2' : choicesProperties[0].isSelected ? '#D6DBF5' : 'white'}}
                onClick={()=>selectAnswer(questionId, choicesProperties[0].id)}>{choicesProperties[0].choice}</p>
                <p style={{backgroundColor: checkResults && choicesProperties[1].isRight? '#94D7A2' : choicesProperties[1].isSelected ? '#D6DBF5' : 'white'}} 
                onClick={()=>selectAnswer(questionId, choicesProperties[1].id)}>{choicesProperties[1].choice}</p>
                <p style={{backgroundColor: checkResults && choicesProperties[2].isRight? '#94D7A2' : choicesProperties[2].isSelected ? '#D6DBF5' : 'white'}}
                onClick={()=>selectAnswer(questionId, choicesProperties[2].id)}>{choicesProperties[2].choice}</p>
                <p style={{backgroundColor: checkResults && choicesProperties[3].isRight? '#94D7A2' : choicesProperties[3].isSelected ? '#D6DBF5' : 'white'}}
                onClick={()=>selectAnswer(questionId, choicesProperties[3].id)}>{choicesProperties[3].choice}</p>
            </div>
        </section>
    )
}