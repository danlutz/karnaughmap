import React from 'react'
import { Container } from 'reactstrap'
import TruthTable from './components/TruthTable/TruthTable'

const App = () => {
  return (
    <Container>
      <h1>Karnaugh map</h1>
      <TruthTable />
    </Container>
  )
}

export default App
