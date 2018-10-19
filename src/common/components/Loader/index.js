import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { themr } from 'react-css-themr';

import defaultTheme from './theme.scss';


@themr('Loader', defaultTheme)
class Loader extends React.PureComponent {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        theme: PropTypes.shape({
            bubble: PropTypes.string,
        }),
        className: PropTypes.string,
    };

    static defaultProps = {
        width: 32,
        height: 32,
        className: '',
    };

    render() {
        const { theme } = this.props;
        return (
            <div className={classNames(theme.loader)} data-test-id="loader">
                <div className={classNames(theme.bubble, theme.first)} />
                <div className={classNames(theme.bubble, theme.middle)} />
                <div className={classNames(theme.bubble, theme.last)} />
            </div>
        );
    }
}

export default Loader;
