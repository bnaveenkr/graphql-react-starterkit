import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classNames from 'classnames/bind';
import { ERROR_UNKNOWN } from 'utils/responseMessages';

import defaultTheme from './theme.scss';

const cx = classNames.bind(defaultTheme);


@themr('ErrorDisplay', defaultTheme)
class ErrorDisplay extends React.PureComponent {
    static propTypes = {
        theme: PropTypes.object,
        active: PropTypes.bool,
        icon: PropTypes.string,
        message: PropTypes.string,
        allowRefetch: PropTypes.bool,
        refetch: PropTypes.func,
    };

    static defaultProps = {
        active: false,
        icon: 'error_outline',
        message: ERROR_UNKNOWN,
        allowRefetch: false,
    };

    render() {
        const { theme } = this.props;

        if (!this.props.active) {
            return null;
        }
        return (
            <div className={cx('errorContent')}>
                <div className={cx('header')}>
                    <i className={cx('material-icons')}>{this.props.icon}</i>
                    <p data-test-id="error-message" dangerouslySetInnerHTML={{ __html: this.props.message }} />
                </div>
                {this.props.allowRefetch ?
                    <button
                        className={theme.refresh}
                        data-test-id="route-refresh-button"
                        onClick={() => this.props.refetch()}
                    >
                        Try Again
                    </button>
                    : null}
            </div>
        );
    }
}


export default ErrorDisplay;
