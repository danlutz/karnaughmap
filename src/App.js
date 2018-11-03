import React from 'react'
import { Container } from 'reactstrap'
import TruthTable from './components/TruthTable/TruthTable'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <h1>Karnaugh Map Generator</h1>
          <TruthTable />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
