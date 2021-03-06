import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {rest} from 'msw'
import '@testing-library/jest-dom'
import {setupServer} from 'msw/node'

import {Questions} from '../client/src/components/questions/Questions.jsx';
import {QuestionRender} from '../client/src/components/questions/QuestionRender.jsx'
import {AnswerRender} from '../client/src/components/questions/AnswerRender.jsx'
import {SubmitQuestionForm} from '../client/src/components/questions/SubmitQuestionForm.jsx'
import {SubmitAnswerForm} from '../client/src/components/questions/SubmitAnswerForm.jsx'

import {questions} from './Fixtures/questions.js'
import {answers} from './Fixtures/answers.js'

const server = setupServer(
  rest.get('/questions', (req, res, ctx) => {
    return res(ctx.json(questions))
  }),
  rest.get('/questions/answers', (req, res, ctx) => {
    return res(ctx.json(answers))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Questions', () => {
  it('Should display Questions elements', async () => {
    /* render app to test DOM
    check if server call has processed by checking for spilled milk
    run component tests */
    render(<Questions productId={63609}/>)
    await waitFor(() => {screen.getByText(
      "Q: Hello I spilled milk on this product and I can't believe it doesn't clean itself"
      )})
    await waitFor(() => {screen.getAllByText('nevermind I gave it to my cat he loves it')})
    expect(screen.getByText('Questions')).toBeDefined();
    expect(screen.getByText('Q: Can I wash it?')).toBeDefined();
    expect(screen.queryAllByText('nevermind I gave it to my cat he loves it')).toBeDefined();
    expect(screen.queryByText('I think they are adding self-cleaning in the next model')).not.toBeInTheDocument();
  })
})

// describe('QuestionRender', () => {
//   it('Should display questions', () => {
//     render(<QuestionRender question={questions.results[0]}/>)
//     expect(screen.getByText('Q: Does this product run big or small?')).toBeDefined();
//   })
// })

// describe('AnswerRender', () => {
//   it('should display answers', () => {
//     render(<AnswerRender answer={questions.results[1].answers['5181606']}/>)
//     expect(screen.getByText("I've thrown it in the wash and it seems fine")).toBeDefined();
//   })
// })

// describe('SubmitQuestionForm', () => {
//   it('should display a button with Add Question', () => {
//     render(<SubmitQuestionForm />)
//     expect(screen.getByText('Add Question')).toBeDefined();
//   })
// })

// describe('SubmitAnswerForm', () => {
//   it('should display a button with Add Answer', () => {
//     render(<SubmitAnswerForm />)
//     expect(screen.getByText('Add Answer')).toBeDefined();
//   })
// })