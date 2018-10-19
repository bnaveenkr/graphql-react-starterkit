import React from 'react';
import ErrorPage from './NotFoundPage';
import * as errors from 'utils/responseMessages';

const { ERROR_UNKNOWN } = errors;

export default function getError(errorState) {
    const { errorType } = errorState;
    const message = errors[errorType] || ERROR_UNKNOWN;
    const ErrorComponent = (props) => (
      <ErrorPage {...{...props, message}} />
    );

    return {
        component: ErrorComponent,
    }
};

