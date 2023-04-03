import { render } from '@testing-library/react'

import DummyComponent from '@/presentation/components/dummy-component'

describe('DummyComponent', () => {
  test('render', () => {
    const { getByTestId } = render(<DummyComponent />)
    expect(getByTestId('content')).toBeInTheDocument()
  })
})
