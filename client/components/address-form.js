import React from 'react';
import { connect } from 'react-redux';
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
  FormSelect,
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import stateOptions from './all-states';
import { Field } from 'redux-form';
import {
  InputField,
  CheckboxField,
  SelectField,
  UploadField,
  Upload,
} from 'react-semantic-redux-form';

const renderTextField = ({
  input,
  name,
  type,
  label,
  width,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
  // <Form.Input
  //   name={name}
  //   {...input}
  //   placeholder={label}
  //   width={width}
  //   label={label}
  // />
  // {touched && (error && {error})}
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
  const { checkout } = props.formState;
  console.log('ADDRESSFORM', checkout);
  return (
    <Form.Field style={{ width: '100%' }}>
      <Form.Group>
          <Field
            type="text"
            name="firstName"
            component={InputField}
            label="First name"
            width={8}
            error
          />
        {checkout && checkout.syncErrors && checkout.syncErrors['firstName'] ? <span> {checkout.syncErrors['firstName']} </span> : null}
        <Field
          type="text"
          name="lastName"
          label="Last Name"
          component={InputField}
          placeholder="Last Name"
          width={8}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          label="Email:"
          name="email"
          component={InputField}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          label="Address line 1:"
          name="addressLine1"
          component={InputField}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          name="addressLine2"
          label="Address line 2:"
          component={InputField}
          width={16}
        />
      </Form.Group>
      <Form.Group style={{ height: '66px' }}>
        <Field
          type="text"
          name="city"
          label="City:"
          component={InputField}
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
          component={InputField}
          width={2}
        />
      </Form.Group>
    </Form.Field>
  );
};

const mapState = ({ form: formState }) => ({ formState });
const mapDispatch = null;
export default connect(mapState, mapDispatch)(AddressForm);
