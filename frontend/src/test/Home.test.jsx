import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home Page', () => {
  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    // Component starts with loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })
})
