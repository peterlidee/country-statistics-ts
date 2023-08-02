import { waitFor, render, screen } from '@testing-library/react'

import TestComponent from './TestComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

jest.mock('axios')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // set retry to false
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // no more errors on the console
    error: () => {},
  },
})
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

function setup(key, endpoint = 'url', options = {}) {
  const { rerender } = render(
    <TestComponent
      keyString={key}
      code='aaa'
      endpoint={endpoint}
      options={options}
    />,
    {
      wrapper,
    },
  )
  return {
    status: screen.getByTestId('status'),
    data: screen.getByTestId('data'),
    loading: screen.getByTestId('loading'),
    isError: screen.getByTestId('isError'),
    error: screen.getByTestId('error'),
    rerender,
  }
}

afterEach(() => {
  queryClient.clear()
})

describe('hooks/useData', () => {
  test('TestComponent renders', async () => {
    axios.get.mockResolvedValue({ value: 'return1' })
    const { status, data, loading, isError, error } = setup('test1')
    expect(status).toBeInTheDocument()
    expect(data).toBeInTheDocument()
    expect(loading).toBeInTheDocument()
    expect(isError).toBeInTheDocument()
    expect(error).toBeInTheDocument()
  })

  test('It calls axios mock once with correct value', async () => {
    axios.get.mockResolvedValue({ value: 'return2' })
    const { status } = setup('test2')
    await waitFor(() => expect(status).toHaveTextContent('success'))
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('url')
  })

  test('It calls axios multiple times with the correct values', async () => {
    axios.get.mockResolvedValue({ value: 'return3' })
    const { status, rerender } = setup('test3')
    await waitFor(() => expect(status).toHaveTextContent('success'))
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('url')
    rerender(<TestComponent keyString='test4' endpoint='newurl' options={{}} />)
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.get).toHaveBeenLastCalledWith('newurl')
  })

  test('It calls returns loading and loaded', async () => {
    axios.get.mockResolvedValue({ value: 'return5' })
    const { status, loading } = setup('test5')
    expect(loading).toHaveTextContent('loading')
    await waitFor(() => expect(status).toHaveTextContent('success'))
    expect(loading).toHaveTextContent('loaded')
  })

  test('It returns data', async () => {
    axios.get.mockResolvedValue({ value: 'return6' })
    const { status, data } = setup('test6')
    expect(data).toHaveTextContent('')
    await waitFor(() => expect(status).toHaveTextContent('success'))
    expect(data).toHaveTextContent('return6')
  })

  test('It returns isError and error', async () => {
    axios.get.mockRejectedValue(new Error('Error 7'))
    const { status, isError, error } = setup('test7')
    expect(isError).toHaveTextContent('noerror')
    expect(error).toHaveTextContent('')
    await waitFor(() => expect(status).toHaveTextContent('error'))
    expect(isError).toHaveTextContent('error')
    expect(error).toHaveTextContent('Error 7')
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})
