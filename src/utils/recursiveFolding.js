import isOdd from './isOdd'

const calcElementsAddedOnFold = fold => Math.ceil(2 ** (fold - 1) / 2)

const getNewPositionsArray = n => {
  const newPositionsArray = []
  for (let i = n; i < n * 2; i++) {
    newPositionsArray.push(i)
  }
  return newPositionsArray
}

/* Vertical fold
1. Copy old matrix
2. Replace values with with counter values
3. Reverse all rows in new matrix
4. Combine all old and new rows
*/

const foldVertical = (positionMatrix, elementsAddedOnFold) => {
  const newPositions = getNewPositionsArray(elementsAddedOnFold)

  // Replace values in reversedMatrix with new counter values
  const newPositionMatrix = []
  for (const row of positionMatrix) {
    const tempRow = []
    for (const value of row) {
      tempRow.push(newPositions[value])
    }
    newPositionMatrix.push(tempRow)
  }

  // Reverse whole matrix
  const reversedNewPositionMatrix = []
  for (const row of newPositionMatrix) {
    reversedNewPositionMatrix.push(row.reverse())
  }

  // Combine old and new rows
  const foldedMatrix = []
  for (let i = 0; i < positionMatrix.length; i++) {
    foldedMatrix.push([...positionMatrix[i], ...reversedNewPositionMatrix[i]])
  }

  return foldedMatrix
}

/* Horizontal fold
1. Copy all old rows
2. Replace values with counter values
3. Reverse order of new rows
4. Append to old matrix
*/
const foldHorizontal = (positionMatrix, elementsAddedOnFold) => {
  const newPositions = getNewPositionsArray(elementsAddedOnFold)

  // Copy all rows and replace their values with counterpart
  const newRows = []
  for (const row of positionMatrix) {
    const tempRow = []
    for (const value of row) {
      tempRow.push(newPositions[value])
    }
    newRows.push(tempRow)
  }

  // Combine old and new rows
  return [...positionMatrix, ...newRows.reverse()]
}

export const calcPositionMatrix = (
  targetFold,
  currentFoldNumber = 0,
  positionMatrix = [[0]]
) => {
  if (currentFoldNumber === targetFold) return positionMatrix
  else {
    currentFoldNumber++

    // Handle edge case
    if (currentFoldNumber === 1) {
      return calcPositionMatrix(targetFold, currentFoldNumber, [[0]])
    }

    // Check if horizontal fold
    const isHorizontalFold = isOdd(currentFoldNumber)

    // Get number of groups added with fold
    const elementsAddedOnFold = calcElementsAddedOnFold(currentFoldNumber)

    if (isHorizontalFold) {
      // Horizontal fold

      return calcPositionMatrix(
        targetFold,
        currentFoldNumber,
        foldHorizontal(positionMatrix, elementsAddedOnFold)
      )
    } else {
      // Vertical fold

      return calcPositionMatrix(
        targetFold,
        currentFoldNumber,
        foldVertical(positionMatrix, elementsAddedOnFold)
      )
    }
  }
}

export const calcPosition = elementNumber => {
  const foldNumber =
    elementNumber !== 0 ? Math.floor(Math.log2(elementNumber)) + 1 : 0
  const positionMatrix = calcPositionMatrix(foldNumber + 1)

  // Find coordinates in positionMatrix
  for (let row = 0; row < positionMatrix.length; row++) {
    for (let col = 0; col < positionMatrix[row].length; col++) {
      if (positionMatrix[row][col] === elementNumber) {
        return [row, col]
      }
    }
  }

  // Position not found
  return [null, null]
}
