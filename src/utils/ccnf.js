import bracket from './bracket'

export const disjunctInputs = inputs =>
  inputs.reduce((formula, input, currentIndex) => {
    // First input should not be prepended with '∨'
    if (currentIndex === 0) return `${input ? '¬x' : 'x'}${currentIndex}`

    // Invert all variables
    return `${formula} ∨ ${input ? '¬x' : 'x'}${currentIndex}`
  }, '')

export const conjuctFormulas = disjunctedFormulas =>
  disjunctedFormulas.reduce((formula, string) => formula + ` ∧ ${string}`)

export const getCanocialConjuctiveNormalForm = (
  falseExpressions,
  wrapFormulas = false
) =>
  conjuctFormulas(
    wrapFormulas
      ? falseExpressions.map(expression =>
          bracket(disjunctInputs(expression.inputs))
        )
      : falseExpressions.map(expression => disjunctInputs(expression.inputs))
  )
