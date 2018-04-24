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
  type,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Input {...input} placeholder={label} />
  // <Form.Field>
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
const renderStateDropdown = ({
  input,
  type,
  label,
  options,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Select
    {...input}
    onChange={(event, {value}) => input.onChange(value)}
    style={{ height: '38px', padding: 0 }}
    placeholder="State"
    search
    selection
    options={stateOptions}
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
  const {
    handleShippingChange,
    handleBillingChange,
    handleShippingDropdownChange,
    handleBillingDropdownChange,
    handleSubmitButtonRef,
    handleOrderSubmit,
    handleCheckboxChange,
    checkBox,
  } = props;

  return (
    <div>
      <Form.Group>
        <Field
          type="text"
          name="firstName"
          component={renderTextField}
          label="First name"
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
      <Form.Group grouped>
        <Checkbox
          defaultChecked
          label="Billing address is same as shipping address."
        />
      </Form.Group>
      <Form.Group>
        <Button as="button" type="submit" ref={handleSubmitButtonRef}>
          Process Order
        </Button>
      </Form.Group>
    </div>
  );
};

export default AddressForm;
