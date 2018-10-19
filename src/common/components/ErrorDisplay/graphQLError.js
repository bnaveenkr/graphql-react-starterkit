import PropTypes from 'prop-types';
import React from 'react';
import { themr } from 'react-css-themr';
import ErrorDisplay from './index';
import { ERROR_REFETCH } from 'utils/responseMessages';
import defaultTheme from './theme.scss';


@themr('GraphQLErrorDisplay', defaultTheme)
class GraphQLErrorDisplay extends React.PureComponent {
    static propTypes = {
        active: PropTypes.bool,
        error: PropTypes.shape({
            graphQLErrors: PropTypes.arrayOf(
                PropTypes.shape({
                    message: PropTypes.string.isRequired,
                    state: PropTypes.shape({
                        key: PropTypes.string.isRequired,
                        message: PropTypes.string.isRequired,
                    }),
                }),
            ),
        }),
        allowRefetch: PropTypes.bool,
        refetch: PropTypes.func,
    };

    static defaultProps = {
        active: false,
        allowRefetch: false,
    };

    parseError = () => {
        const { error, allowRefetch } = this.props;
        const err = error.graphQLErrors[0];
        if (err === undefined) {
            return null
        }
        if (err.message === 'customError') {
            switch(err.state.key) {
                case 'permissionError':
                    return this.showError(err.state.message, 'do_not_disturb');
                case 'assetError':
                    return this.showError(err.state.message);
                case 'searchError':
                    if (allowRefetch === true) {
                        return this.refetchPage();
                    }
                    return this.showError(err.state.message);
                default:
                    return this.showError();
            }
        }
        return this.showError();
    };

    showError = (errorMessage, icon) => {
        return (
            <ErrorDisplay
              active={true}
              message={errorMessage}
              icon={icon}
            />
        );
    };

    refetchPage = () => {
        return (
            <ErrorDisplay
              active={true}
              message={ERROR_REFETCH}
              allowRefetch={true}
              refetch={this.props.refetch}
            />
        );
    };

    render() {
        return this.parseError();
    };
}


export default GraphQLErrorDisplay;
