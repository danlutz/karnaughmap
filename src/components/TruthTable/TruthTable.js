import React, { useState } from 'react'
import {
  Table,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
  Collapse,
  Button
} from 'reactstrap'
import styled from 'styled-components'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import NormalForms from '../NormalForms/NormalForms'
import KarnaughMap from '../KarnaughMap/KarnaughMap'

import useTruthTable from '../../hooks/useTruthTable'

const ResultToggleButton = styled(Button)`
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-size: 0.85rem;
  background-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
  border-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
  color: ${props => (props.value === 1 ? '#000' : '#fff')};

  &:hover {
    background-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
    border-color: ${props => (props.value === 1 ? '#01ff70' : '#6c757d')};
    color: ${props => (props.value === 1 ? '#000' : '#fff')};
  }
`

const TruthTable = () => {
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
  const [showTruthTable, setShowTruthTable] = useState(true)

  const trueExpressions = expressions.filter(exp => exp.result)
  const falseExpressions = expressions.filter(exp => !exp.result)

  const isTautology = falseExpressions.length === 0
  const isContradiction = trueExpressions.length === 0

  return (
    <>
      <FormGroup>
        <Label for="numberOfInputs">Number of boolean variables</Label>
        <InputGroup>
          <Input
            type="number"
            value={numberOfInputs}
            min="1"
            max="32"
            onChange={handleInputsChange}
          />
          <InputGroupAddon>
            <Button
              onClick={increaseInputs}
              style={{ transform: 'rotate(180deg)', margin: '0 10px' }}
            >
              <span className="dropdown-toggle" />
            </Button>
          </InputGroupAddon>
          <InputGroupAddon>
            <Button onClick={decreaseInputs}>
              <span className="dropdown-toggle" />
            </Button>
          </InputGroupAddon>
        </InputGroup>

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
      {numberOfInputs > 0 ? (
        <>
          <Button onClick={() => setShowTruthTable(!showTruthTable)}>
            {showTruthTable ? 'Hide' : 'Show'} truth table
          </Button>
          <Collapse isOpen={showTruthTable}>
            <HorizontalScrollWrapper>
              <h2>Truth Table</h2>
              <Table bordered striped>
                <thead>
                  <tr>
                    <th style={{ width: '20px' }}>#</th>
                    {headers.map((header, key) => (
                      <th key={key}>
                        <span>
                          x<sub>{header}</sub>
                        </span>
                      </th>
                    ))}
                    <th>y</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowNumber) => {
                    const result = results[rowNumber]
                    return (
                      <tr key={rowNumber}>
                        <td>{rowNumber}</td>
                        {row.map((cell, cellNumber) => (
                          <td key={cellNumber}>{cell}</td>
                        ))}
                        <td>
                          <ResultToggleButton
                            onClick={() => toggleResult(rowNumber)}
                            className=""
                            value={result}
                          >
                            {result === 1 ? 'True' : 'False'}
                          </ResultToggleButton>
                        </td>
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
