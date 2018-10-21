import React from 'react';
import { themr } from 'react-css-themr';

import defaultTheme from './theme.scss';


@themr('IndexRoute', defaultTheme)
class IndexRoute extends React.PureComponent {
    render() {
        return (
            <div className={this.props.theme.wrapper}>
                <br />
                <br />
                Yooooooo!
            </div>
        );
    }
}


export default IndexRoute;
