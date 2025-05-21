"use client"

import { useState } from "react"
import { MdSave, MdAdd, MdDelete, MdDragIndicator } from "react-icons/md"
import "./CreateSurvey.css"

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState([{ id: 1, type: "multiple_choice", text: "", options: ["", ""] }])

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "multiple_choice",
      text: "",
      options: ["", ""],
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestionText = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
  }

  const updateQuestionType = (id, type) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, type } : q)))
  }

  const addOption = (questionId) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, options: [...q.options, ""] } : q)))
  }

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options]
          newOptions[optionIndex] = value
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  const removeOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options]
          newOptions.splice(optionIndex, 1)
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  return (
    <div className="create-survey-page">
      <div className="page-header">
        <h1>Create Survey</h1>
        <button className="btn btn-primary">
          <MdSave /> Save Survey
        </button>
      </div>

      <div className="survey-form">
        <div className="survey-details">
          <div className="form-group">
            <label htmlFor="surveyTitle">Survey Title</label>
            <input
              type="text"
              id="surveyTitle"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              placeholder="Enter survey title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surveyDescription">Description (Optional)</label>
            <textarea
              id="surveyDescription"
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
              placeholder="Enter survey description"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="questions-container">
          <h2>Questions</h2>

          {questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <div className="drag-handle">
                  <MdDragIndicator />
                </div>
                <span className="question-number">Question {index + 1}</span>
                <button className="remove-question" onClick={() => removeQuestion(question.id)}>
                  <MdDelete />
                </button>
              </div>

              <div className="question-content">
                <div className="form-group">
                  <label htmlFor={`question-${question.id}`}>Question Text</label>
                  <input
                    type="text"
                    id={`question-${question.id}`}
                    value={question.text}
                    onChange={(e) => updateQuestionText(question.id, e.target.value)}
                    placeholder="Enter question text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`question-type-${question.id}`}>Question Type</label>
                  <select
                    id={`question-type-${question.id}`}
                    value={question.type}
                    onChange={(e) => updateQuestionType(question.id, e.target.value)}
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="text">Text</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {(question.type === "multiple_choice" || question.type === "checkbox") && (
                  <div className="options-container">
                    <label>Options</label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-row">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        {question.options.length > 2 && (
                          <button className="remove-option" onClick={() => removeOption(question.id, optionIndex)}>
                            <MdDelete />
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="add-option" onClick={() => addOption(question.id)}>
                      <MdAdd /> Add Option
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button className="add-question" onClick={addQuestion}>
            <MdAdd /> Add Question
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSurvey
