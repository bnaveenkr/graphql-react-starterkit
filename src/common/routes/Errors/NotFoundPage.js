import React from 'react';
import { themr } from 'react-css-themr';
import classNames from 'classnames/bind';

import ErrorDisplay from 'components/ErrorDisplay';
import defaultTheme from './theme.scss';
import { ERROR_NOT_FOUND } from 'utils/responseMessages';

const cx = classNames.bind(defaultTheme);


@themr('NotFoundPage', defaultTheme)
class NotFoundPage extends React.PureComponent {
    render() {
        return (
            <div className={cx('notFoundPage')}>
                <ErrorDisplay
                    active={true}
                    message={this.props.message}
                />
            </div>
        );
    }
}

module.exports = NotFoundPage;
