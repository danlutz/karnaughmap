import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Collapse, Button } from 'reactstrap'
import styled from 'styled-components'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'

const ResultToggleButton = styled(Button)`
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-size: 0.85rem;
  background-color: ${({ isTrue }) => (isTrue ? '#01ff70' : '#6c757d')};
  border-color: ${({ isTrue }) => (isTrue ? '#01ff70' : '#6c757d')};
  color: ${({ isTrue }) => (isTrue ? '#000' : '#fff')};

  &:hover {
    background-color: ${({ isTrue }) => (isTrue ? '#01ff70' : '#6c757d')};
    border-color: ${({ isTrue }) => (isTrue ? '#01ff70' : '#6c757d')};
    color: ${({ isTrue }) => (isTrue ? '#000' : '#fff')};
  }
`

const TruthTable = ({
  headers = [],
  rows = [],
  results = [],
  toggleResult
}) => {
  const [showTruthTable, setShowTruthTable] = useState(true)

  return (
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
                <th style={{ width: '20px' }} scope="col">
                  #
                </th>
                {headers.map((header, key) => (
                  <th key={key} scope="col">
                    <span>
                      x<sub>{header}</sub>
                    </span>
                  </th>
                ))}
                <th scope="col">y</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowNumber) => {
                const result = results[rowNumber]
                return (
                  <tr key={rowNumber}>
                    <th scope="row">{rowNumber}</th>
                    {row.map((cell, cellNumber) => (
                      <td key={cellNumber}>{cell}</td>
                    ))}
                    <td>
                      <ResultToggleButton
                        onClick={() => toggleResult(rowNumber)}
                        isTrue={result}
                      >
                        {result ? 'True' : 'False'}
                      </ResultToggleButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </HorizontalScrollWrapper>
      </Collapse>
    </>
  )
}

TruthTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.number),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  results: PropTypes.objectOf(PropTypes.number),
  toggleResult: PropTypes.func.isRequired
}

export default TruthTable
