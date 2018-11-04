import React from 'react'
import { Container } from 'reactstrap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Configuration from './components/Configuration/Configuration'
import TruthTable from './components/TruthTable/TruthTable'
import NormalForms from './components/NormalForms/NormalForms'
import KarnaughMap from './components/KarnaughMap/KarnaughMap'

import useTruthTable from './hooks/useTruthTable'

const App = () => {
  const {
    numberOfInputs,
    handleInputsChange,
    increaseInputs,
    decreaseInputs,
    headers,
    rows,
    results,
    toggleResult,
    expressions
  } = useTruthTable(2)

  const trueExpressions = expressions.filter(exp => exp.result)
  const falseExpressions = expressions.filter(exp => !exp.result)

  const isTautology = falseExpressions.length === 0
  const isContradiction = trueExpressions.length === 0

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <h1>Karnaugh Map Generator</h1>
          <Configuration
            numberOfInputs={numberOfInputs}
            handleInputsChange={handleInputsChange}
            increaseInputs={increaseInputs}
            decreaseInputs={decreaseInputs}
          />
          {numberOfInputs > 0 ? (
            <>
              <TruthTable
                headers={headers}
                rows={rows}
                results={results}
                toggleResult={toggleResult}
              />

              <NormalForms
                trueExpressions={trueExpressions}
                falseExpressions={falseExpressions}
              />

              {isTautology && <p>Formula is a tautology (always true).</p>}
              {isContradiction && (
                <p>Formula is a contradiction (always false).</p>
              )}

              <KarnaughMap
                booleanExpressions={expressions}
                numberOfInputs={numberOfInputs}
              />
            </>
          ) : (
            <p>At least 1 input is required</p>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
