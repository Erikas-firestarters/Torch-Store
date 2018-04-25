import React from 'react';
import {
  Button,
  Grid,
  Icon,
  Label,
  Sticky,
  Header,
  Form,
  Dropdown,
  Select,
  Checkbox,
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import stateOptions from './all-states';
import { Field } from 'redux-form';

const renderTextField = ({
  input,
  name,
  label,
  width,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Input name={name} {...input} placeholder={label} width={width} label={label}>
    {touched && (error && <span>{error}</span>)}
  </Form.Input>
);
const renderStateDropdown = ({
  input,
  label,
  options,
  width,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Select
    {...input}
    label={label}
    onChange={(event, { value }) => input.onChange(value)}
    style={{ height: '38px', padding: 0 }}
    placeholder="State"
    search
    selection
    options={stateOptions}
    width={width}
    autoComplete="true"
  />

  // <Form.Field>
  //   <select className="ui search dropdown">
  //     {stateOptions.map(state => (<option key={state.key} value={state.value}>{state.text}</option>))}
  //   </select>
  //   {/* <Select /> */}

  //   {/* {touched && error ? (
  //     <Label basic color="red" pointing>
  //       {error} {...input}
  //       {...custom}
  //     </Label>
  //   ) : (
  //     <div />
  //   )} */}
  // </Form.Field>
);

export const AddressForm = props => {

  return (
    <Form.Field style={{ width: '100%' }}>
      <Form.Group>
        <Field
          type="text"
          name="firstName"
          component={renderTextField}
          label="First name"
          width={8}
        />
        <Field
          type="text"
          name="lastName"
          label="Last Name"
          component={renderTextField}
          placeholder="Last Name"
          width={8}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          label="Address line 1:"
          name="email"
          component={renderTextField}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          label="Address line 1:"
          name="addressLine1"
          component={renderTextField}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          name="addressLine2"
          label="Address line 2:"
          component={renderTextField}
          width={16}
        />
      </Form.Group>
      <Form.Group style={{ height: '66px' }}>
        <Field
          type="text"
          name="city"
          label="City:"
          component={renderTextField}
          width={6}
        />

        <Field
          type="select"
          name="state"
          label="State:"
          component={renderStateDropdown}
          width={8}
        />
        <Field
          type="text"
          name="zipcode"
          label="Zip Code:"
          component={renderTextField}
          width={2}
        />
      </Form.Group>
    </Form.Field>
  );
};

export default AddressForm;
