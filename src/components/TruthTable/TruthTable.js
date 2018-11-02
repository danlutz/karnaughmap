import React from 'react'
import { Table, FormGroup, Label, Input, FormText } from 'reactstrap'
import TableWrapper from '../Misc/TableWrapper'
import KNF from '../NormalForms/KKNF'
import DNF from '../NormalForms/KDNF'

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
  } = useTruthTable(2)

  const trueExpressions = expressions
    .filter(exp => exp.result)
    .map(exp => exp.inputs)
  const falseExpressions = expressions
    .filter(exp => !exp.result)
    .map(exp => exp.inputs)

  const isTautology = falseExpressions.length === 0
  const isContradiction = trueExpressions.length === 0

  return (
    <div>
      <FormGroup>
        <Label for="numberOfInputs">Number of boolean variables</Label>
        <Input
          type="number"
          value={numberOfInputs}
          min="1"
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
      {numberOfInputs > 0 ? (
        <div>
          <TableWrapper>
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
          </TableWrapper>
          {isTautology && <p>Formula is a tautology (always true)</p>}
          {isContradiction && <p>Formula is a contradiction (always false)</p>}
          <KNF falseExpressions={falseExpressions} />
          <DNF trueExpressions={trueExpressions} />
        </div>
      ) : (
        <p>At least 1 variable is required</p>
      )}
    </div>
  )
}

export default TruthTable
