import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import KarnaughMapGroup from './KarnaughMapGroup'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import isEven from '../../utils/isEven'

const StyledKarnaughMap = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
`

// Calculate needed rows and columns
export const calcGrid = numberOfInputs => {
  // Handle edge case
  if (numberOfInputs === 1) return [1, 1]

  let rows = 1
  let columns = 1

  for (let i = 2; i < numberOfInputs; i++) {
    if (columns === rows) columns *= 2
    else rows *= 2
  }

  return [rows, columns]
}

// Splits an array of expressions in chunks of 4
export const splitIntoGroups = expressions => {
  const groups = []

  while (expressions.length > 0) groups.push(expressions.splice(0, 4))

  return groups
}

// Alternate top/bottom positioning every 8 rows (2 groups of 4 rows)
const checkTopPositioning = n => isEven(Math.floor(n / 2))

// Alternate left/right positioning for every group
// Alternate the starting value of left/right every 4 groups
const checkLeftPositioning = n => {
  const groupOf4StartsLeft = isEven(Math.floor(n / 4))

  return isEven(n) ? groupOf4StartsLeft : !groupOf4StartsLeft
}

const KarnaughMap = ({ booleanExpressions = [], numberOfInputs }) => {
  const groups = splitIntoGroups(booleanExpressions)
  const [rows, columns] = calcGrid(numberOfInputs)

  return (
    <>
      <h2>Karnaugh Map</h2>
      <HorizontalScrollWrapper>
        <StyledKarnaughMap rows={rows} columns={columns}>
          {groups.map((group, n) => (
            <KarnaughMapGroup
              group={group}
              groupNumber={n}
              startTop={checkTopPositioning(n)}
              startLeft={checkLeftPositioning(n)}
              key={n}
            />
          ))}
        </StyledKarnaughMap>
      </HorizontalScrollWrapper>
    </>
  )
}

KarnaughMap.propTypes = {
  booleanExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired,
  numberOfInputs: PropTypes.number.isRequired
}

export default KarnaughMap
