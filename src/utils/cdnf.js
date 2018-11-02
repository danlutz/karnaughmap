import bracket from './bracket'

export const conjunctInputs = inputs =>
  inputs.reduce((formula, input, currentIndex) => {
    // First input should not be prepended with '∧'
    if (currentIndex === 0) return `${input ? 'x' : '¬x'}${currentIndex}`

    return `${formula} ∧ ${input ? 'x' : '¬x'}${currentIndex}`
  }, '')

export const disjunctFormulas = stringArray =>
  stringArray.reduce((formula, string) => formula + ` ∨ ${string}`)

export const getCanocialDisjunctiveNormalForm = (
  falseExpressions,
  wrapFormulas = false
) =>
  disjunctFormulas(
    wrapFormulas
      ? falseExpressions.map(expression =>
          bracket(conjunctInputs(expression.inputs))
        )
      : falseExpressions.map(expression => conjunctInputs(expression.inputs))
  )
