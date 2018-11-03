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
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import CCNF from '../NormalForms/CCNF'
import CDNF from '../NormalForms/CDNF'
import KarnaughMap from '../KarnaughMap/KarnaughMap'

import useTruthTable from '../../hooks/useTruthTable'

const TruthTable = () => {
  const {
    numberOfInputs,
    handleInputsChange,
    headers,
    rows,
    results,
    handleResultChange,
    expressions
  } = useTruthTable(3)
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
                  {rows.map((row, rowNumber) => (
                    <tr key={rowNumber}>
                      {[
                        ...row,
                        <select
                          name={rowNumber}
                          value={results[rowNumber]}
                          onChange={handleResultChange}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                        </select>
                      ].map((cell, cellNumber) => (
                        <td key={cellNumber}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </HorizontalScrollWrapper>
          </Collapse>

          {isTautology && <p>Formula is a tautology (always true)</p>}
          {isContradiction && <p>Formula is a contradiction (always false)</p>}
          <CCNF falseExpressions={falseExpressions} />
          <CDNF trueExpressions={trueExpressions} />
          <KarnaughMap
            booleanExpressions={expressions}
            numberOfInputs={numberOfInputs}
          />
        </>
      ) : (
        <p>At least 1 variable is required</p>
      )}
    </>
  )
}

export default TruthTable
