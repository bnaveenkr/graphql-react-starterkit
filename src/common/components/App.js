import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { themr } from 'react-css-themr';

import Navbar from './Navbar';
import defaultTheme from './theme.scss';


@themr('GlobalWrapper', defaultTheme)
class App extends React.Component {

    static propTypes = {
        theme: PropTypes.shape({
            wrapper: PropTypes.string,
        }),
        children: PropTypes.any,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: '',
    };

    render() {
        return (
            <div className={classNames(this.props.theme.wrapper, this.props.className)}>
                <Navbar />
                {this.props.children}
            </div>
        );
    }
}

module.exports = App;
