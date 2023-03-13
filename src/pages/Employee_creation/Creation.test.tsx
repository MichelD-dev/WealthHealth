import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Form from './Creation'
import {vi} from 'vitest'

const createEmployee = vi.fn((firstName, lastName) => {
  return Promise.resolve({firstName, lastName})
})

it('should display required error when value is invalid', async () => {
  render(<Form />)

  fireEvent.submit(screen.getByRole('button'))

  // expect(await screen.findAllByRole('alert')).toHaveLength(2)
  expect(createEmployee).not.toBeCalled()
})

it('should display matching error when email is invalid', async () => {
  render(<Form />)

  fireEvent.input(screen.getByRole('textbox', {name: /first name/i}), {
    target: {
      value: 'john',
    },
  })

  fireEvent.input(screen.getByRole('textbox', {name: /last name/i}), {
    target: {
      value: 'doe',
    },
  })

  fireEvent.submit(screen.getByRole('button', {name: /save/i}))

  // expect(await screen.findByRole('alert')).toBeInTheDocument()
  expect(createEmployee).not.toBeCalled()
  expect(screen.getByRole('textbox', {name: /first name/i})).toHaveValue('john')
  expect(screen.getByLabelText('Last Name')).toHaveValue('doe')
})

it.skip('should display min length error when password is invalid', async () => {
  render(<Form />)

  fireEvent.input(screen.getByRole('textbox', {name: /first name/i}), {
    target: {
      value: 'test@mail.com',
    },
  })

  fireEvent.input(screen.getByLabelText('password'), {
    target: {
      value: 'pass',
    },
  })

  fireEvent.submit(screen.getByRole('button'))

  expect(await screen.findByRole('alert')).toBeInTheDocument()
  expect(createEmployee).not.toBeCalled()
  expect(screen.getByRole('textbox', {name: /email/i})).toHaveValue(
    'test@mail.com',
  )
  expect(screen.getByLabelText('password')).toHaveValue('pass')
})

it('should not display error when value is valid', async () => {
  render(<Form />)

  fireEvent.input(screen.getByRole('textbox', {name: /first name/i}), {
    target: {
      value: 'john',
    },
  })

  fireEvent.input(screen.getByRole('textbox', {name: /last name/i}), {
    target: {
      value: 'doe',
    },
  })

  fireEvent.submit(screen.getByRole('button', {name: /save/i}))

  // await waitFor(() =>
  //   expect(screen.queryByRole('alert')).not.toBeInTheDocument(),
  // )
  expect(createEmployee).toBeCalledWith('john', 'doe')
  expect(screen.getByRole('textbox', {name: /first name/i})).toHaveValue('')
  expect(screen.getByRole('textbox', {name: /last name/i})).toHaveValue('')
})
