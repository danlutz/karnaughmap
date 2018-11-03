// Calculates the columns and rows for karnaugh map groups (4 formulas/lines in truth table)
// Returns an array of shape [columns, rows]

export const getGrid = numberOfInputs => {
  // Handle edge case
  if (numberOfInputs === 1) return [1, 1]

  let grid = [1, 1] // columns, rows

  for (let i = 2; i < numberOfInputs; i++) {
    const [columns, rows] = grid

    if (columns === rows) grid[0] = columns * 2
    else grid[1] = rows * 2
  }

  return grid
}

// Splits an array of expressions in groups of 4
export const getGroups = expressions => {
  const groups = []

  while (expressions.length > 0) groups.push(expressions.splice(0, 4))

  return groups
}

export const getGroupCoordinates = groupNumber => {}
