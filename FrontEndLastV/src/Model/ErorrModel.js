import React from 'react';

import Model from './Model';
import Button from '../shared/components/Button/Button';

const ErrorModel = props => {
  return (
    <Model
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Model>
  );
};

export default ErrorModel;
