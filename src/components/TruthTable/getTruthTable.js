export const getHeaders = numberOfInputs => {
  const headers = []
  for (let i = 0; i < numberOfInputs; i++) {
    headers.push(i)
  }
  return headers
}

export const getRows = numberOfInputs => {
  const rows = []
  // Create 2^n rows
  for (let rowNumber = 0; rowNumber < 2 ** numberOfInputs; rowNumber++) {
    rows.push(getRow(rowNumber, numberOfInputs))
  }

  return rows
}

const getRow = (rowNumber, numberOfInputs) => {
  const row = []

  for (let cellNumber = 0; cellNumber < numberOfInputs; cellNumber++) {
    row.push(getCellValue(rowNumber, cellNumber))
  }
  // Reverse the array to get higher bits at the front
  return row.reverse()
}

const getCellValue = (rowNumber, cellNumber) => {
  // Right shift the binary value of the rowNumber by cellNumber bits
  return (rowNumber >> cellNumber) & 1
}
