import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import { describe, it } from 'vitest'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function MockApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>

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
