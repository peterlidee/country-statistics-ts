import { useData } from '../useData'

export default function TestComponent({
  keyString,
  code,
  endpoint,
  options = {},
}) {
  const { status, data, isLoading, isError, error } = useData(
    keyString,
    code,
    endpoint,
    options,
  )
  if (isError) {
  }
  return (
    <>
      <div data-testid='status'>{status}</div>
      <div data-testid='data'>{data?.value}</div>
      <div data-testid='loading'>{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid='isError'>{isError ? 'error' : 'noerror'}</div>
      <div data-testid='error'>{error?.message}</div>
    </>
  )
}
