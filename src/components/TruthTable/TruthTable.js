import React, { useState } from 'react'
import {
  Table,
  FormGroup,
  Label,
  Input,
  FormText,
  Collapse,
  Button
} from 'reactstrap'
import styled from 'styled-components'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import NormalForms from '../NormalForms/NormalForms'
import KarnaughMap from '../KarnaughMap/KarnaughMap'

import useTruthTable from '../../hooks/useTruthTable'

const ResultToggleButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  background-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
  border-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
  color: ${props => (props.value === 1 ? '#000' : '#fff')};
`

const TruthTable = () => {
  const {
    numberOfInputs,
    handleInputsChange,
    headers,
    rows,
    results,
    toggleResult,
    expressions
  } = useTruthTable(2)
  const [showTruthTable, setShowTruthTable] = useState(true)

  const trueExpressions = expressions.filter(exp => exp.result)
  const falseExpressions = expressions.filter(exp => !exp.result)

  const isTautology = falseExpressions.length === 0
  const isContradiction = trueExpressions.length === 0

  return (
    <>
      <FormGroup>
        <Label for="numberOfInputs">Number of boolean variables</Label>
        <Input
          type="number"
          value={numberOfInputs}
          min="1"
          max="32"
          onChange={handleInputsChange}
        />
        <FormText>
          Please note you are generating 2 ^ n * (n + 1) table cells, numbers
          bigger than 12 will probably crash your browser{' '}
          <span role="img" aria-label="bomb emoji">
            💣
          </span>
          <span role="img" aria-label="ghost emoji">
            👻
          </span>
        </FormText>
      </FormGroup>
      <Button onClick={() => setShowTruthTable(!showTruthTable)}>
        {showTruthTable ? 'Hide' : 'Show'} truth table
      </Button>
      {numberOfInputs > 0 ? (
        <>
          <Collapse isOpen={showTruthTable}>
            <HorizontalScrollWrapper>
              <h2>Truth Table</h2>
              <Table bordered striped>
                <thead>
                  <tr>
                    {[...headers, 'y'].map(
                      (header, key) =>
                        header !== 'y' ? (
                          <th key={key}>
                            <span>
                              x<sub>{header}</sub>
                            </span>
                          </th>
                        ) : (
                          <th key={key}>y</th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowNumber) => {
                    const result = results[rowNumber]
                    return (
                      <tr key={rowNumber}>
                        {[
                          ...row,
                          <ResultToggleButton
                            onClick={() => toggleResult(rowNumber)}
                            className=""
                            value={result}
                          >
                            {result === 1 ? 'True' : 'False'}
                          </ResultToggleButton>
                        ].map((cell, cellNumber) => (
                          <td key={cellNumber}>{cell}</td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </HorizontalScrollWrapper>
          </Collapse>

          <NormalForms
            trueExpressions={trueExpressions}
            falseExpressions={falseExpressions}
          />

          {isTautology && <p>Formula is a tautology (always true).</p>}
          {isContradiction && <p>Formula is a contradiction (always false).</p>}

          <KarnaughMap
            booleanExpressions={expressions}
            numberOfInputs={numberOfInputs}
          />
        </>
      ) : (
        <p>At least 1 input is required</p>
      )}
    </>
  )
}

export default TruthTable
