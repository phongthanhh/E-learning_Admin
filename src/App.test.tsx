import { render } from '@testing-library/react'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import { describe, it } from 'vitest'

function MockApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('App', () => {
  it('Render title of app', () => {
    // ARRANGE
    render(<MockApp />)
    // ACT
    // EXPECT
    // expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard')
  })
})
