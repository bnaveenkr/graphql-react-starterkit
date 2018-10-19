import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { themr } from 'react-css-themr';
import defaultTheme from './theme.scss';


@themr('Navbar', defaultTheme)
class Navbar extends React.PureComponent {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            userInitials: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            createdOn: PropTypes.string.isRequired,
        }),
        loading: PropTypes.bool.isRequired,
        actions: PropTypes.object,
    };

    render() {
        const { theme } = this.props;
        return (
            <div className={classNames(theme.navBar, this.props.className)}>
                <Link to="/" className={theme.logo} data-test-id="top-nav-brand" />
            </div>
        );
    }
}

export default Navbar;
