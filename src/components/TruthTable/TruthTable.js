import React, { useState } from 'react'
import { Table, FormGroup, Label, Input, FormText } from 'reactstrap'
import TableWrapper from '../Misc/TableWrapper'

import { getHeaders, getRows } from './getTruthTable'
import useTruthTable from '../../hooks/useTruthTable'

const TruthTable = () => {
  const [numberOfInputs, setNumberOfInputs] = useState(2)
  const { results, handleChange } = useTruthTable(numberOfInputs)
  const headers = [...getHeaders(numberOfInputs), 'y']
  const rows = getRows(numberOfInputs)

  const handleNumberOfInputsChange = e => {
    setNumberOfInputs(e.target.value)
  }

  return (
    <div>
      <FormGroup>
        <Label for="numberOfInputs">Number of boolean variables</Label>
        <Input
          type="number"
          value={numberOfInputs}
          min="1"
          onChange={handleNumberOfInputsChange}
        />
        <FormText>
          Please note you are generating 2 ^ n * (n + 1) table cells, numbers
          bigger than 12 will probably crash your browser 💣👻
        </FormText>
      </FormGroup>
      {numberOfInputs > 0 ? (
        <div>
          <TableWrapper>
            <Table bordered striped>
              <thead>
                <tr>
                  {headers.map((i, key) => (
                    <th key={key}>
                      <span>
                        x<sub>{i}</sub>
                      </span>
                    </th>
                  ))}
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
                        onChange={handleChange}
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
        </div>
      ) : (
        <p>At least 1 variable is required</p>
      )}
    </div>
  )
}

export default TruthTable
