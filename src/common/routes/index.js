import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from 'components/App';
import Default  from './Default';
import getError from './Errors';

const routeConfigs = {
    redirects: [],
    component: App,
    routes: [
        Default,
        getError({ errorType: 'ERROR_NOT_FOUND' }),
    ],
};

const renderRoutes = (config, props) => {
    if(!config.component) return null;
    return (
        <config.component {...props}>
            <Switch>
                {config.routes ? config.routes.map((route, i) => {
                    return(
                        <Route
                            key={route.key || `route__key__${i}`}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => {
                                return renderRoutes(route, props);
                            }}
                        />
                    );
                }) : null}
            </Switch>
        </config.component>
    );
};

export default () => {
    return renderRoutes(routeConfigs);
};