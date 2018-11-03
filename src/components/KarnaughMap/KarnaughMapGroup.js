import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import KarnaughMapElement from './KarnaughMapElement'
import { calcPosition } from '../../utils/recursiveFolding'
import isEven from '../../utils/isEven'
import isOdd from '../../utils/isOdd'

const StyledKarnaughMap = styled.div`
  border: 1px solid #000;
  grid-column: ${props => props.column + 1}; // Grid columns start at 1
  grid-row: ${props => props.row + 1}; // Grid rows start at 1
  display: grid;
  grid-template-columns: [left] 1fr [right] 1fr;
  grid-template-rows: ${props =>
    props.singleLine
      ? '[top] 1fr'
      : '[top] 1fr [bottom] 1fr'}; // Edge case with 1 input
  position: relative;

  .groupNumber {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.25rem;
    font-size: 10px;
    color: red;
    z-index: 10;
  }
`

// First 2 children should use start positioning of row
const checkTopPositioning = (startTop, n) => {
  if (startTop) {
    return n < 2
  } else return n >= 2
}

// If number is even, child should use the start positioning of column
const checkLeftPositioning = (startLeft, n) => {
  if (startLeft) {
    return isEven(n)
  } else return isOdd(n)
}

const KarnaughMapGroup = ({ group = [], startTop, startLeft, groupNumber }) => {
  const [row, column] = calcPosition(groupNumber)

  return (
    <StyledKarnaughMap
      singleLine={group.length === 2}
      row={row}
      column={column}
    >
      <span className="groupNumber">{groupNumber}</span>
      {group.map((expression, n) => {
        return (
          <KarnaughMapElement
            booleanExpression={expression}
            top={checkTopPositioning(startTop, n)}
            left={checkLeftPositioning(startLeft, n)}
            key={n}
          />
        )
      })}
    </StyledKarnaughMap>
  )
}

KarnaughMapGroup.propTypes = {
  group: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ),
  groupNumber: PropTypes.number.isRequired,
  startTop: PropTypes.bool.isRequired,
  startLeft: PropTypes.bool.isRequired
}

export default KarnaughMapGroup
