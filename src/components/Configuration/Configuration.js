import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
  Button
} from 'reactstrap'

const Configuration = ({
  numberOfInputs,
  handleInputsChange,
  increaseInputs,
  decreaseInputs
}) => {
  return (
    <FormGroup>
      <Label for="numberOfInputs">Number of boolean variables</Label>
      <InputGroup>
        <Input
          type="number"
          value={numberOfInputs}
          min="1"
          max="32"
          onChange={handleInputsChange}
        />
        <InputGroupAddon>
          <Button
            onClick={increaseInputs}
            style={{ transform: 'rotate(180deg)', margin: '0 10px' }}
          >
            <span className="dropdown-toggle" />
          </Button>
        </InputGroupAddon>
        <InputGroupAddon>
          <Button onClick={decreaseInputs}>
            <span className="dropdown-toggle" />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <FormText>
        Technically, up to 32 inputs are supported. Please note that data is
        generated (and rendered) client-side, so inputs > 10 will probably crash
        your browser{' '}
        <span role="img" aria-label="bomb emoji">
          💣
        </span>
        <span role="img" aria-label="ghost emoji">
          👻
        </span>
      </FormText>
    </FormGroup>
  )
}

Configuration.propTypes = {
  numberOfInputs: PropTypes.number.isRequired,
  handleInputsChange: PropTypes.func.isRequired,
  increaseInputs: PropTypes.func.isRequired,
  decreaseInputs: PropTypes.func.isRequired
}

export default Configuration
