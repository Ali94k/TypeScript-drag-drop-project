// validation

export interface Validateable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export function validate(validateableInput: Validateable) {
  let isValid = true
  if (validateableInput.required) {
    isValid = isValid && validateableInput.value.toString().trim().length !== 0
  }

  if (
    validateableInput.minLength &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length > validateableInput.minLength
  }

  if (
    validateableInput.maxLength &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length < validateableInput.maxLength
  }

  if (validateableInput.min && typeof validateableInput.value === 'number') {
    isValid = isValid && validateableInput.value > validateableInput.min
  }

  if (validateableInput.max && typeof validateableInput.value === 'number') {
    isValid = isValid && validateableInput.value < validateableInput.max
  }

  return isValid
}
