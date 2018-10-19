import PropTypes from 'prop-types';
import React from 'react';

class Html extends React.PureComponent
{
    static propTypes = {
        assets: PropTypes.object,
        content: PropTypes.string,
        state: PropTypes.object,
        config: PropTypes.object,
        errors: PropTypes.object,
    };

    render() {
        const { assets, content, state, config, errors } = this.props;
        const icon = require('../common/media/favicon.png'); // eslint-disable-line global-require
        const apolloStateStr = `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`;
        const errorStateStr = `window.__ERRORS__=${JSON.stringify(errors)};`;
        const configStr = `window.__CONFIG__=${JSON.stringify(config)};`;

        return (
            <html lang="en-us">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Tech Talks | Conference Talks</title>
                    <link rel="shortcut icon" href={icon} />
                    {Object.keys(assets.styles).map((style, i) =>
                        <link
                          href={assets.styles[style]}
                          key={i}
                          media="screen, projection"
                          rel="stylesheet"
                          type="text/css"
                        />
                    )}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
                    <div id="modal-root" />
                    <script
                      dangerouslySetInnerHTML={{
                          __html: `${apolloStateStr} ${errorStateStr} ${configStr}`,
                      }}
                      charSet="UTF-8"
                    />
                    {Object.keys(assets.javascript).map((script, i) => {
                        if (/common/.test(assets.javascript[script])) {
                            return <script src={assets.javascript[script]} key={i} type="text/javascript"/>
                        }
                    })}
                    {Object.keys(assets.javascript).map((script, i) => {
                        if (!/common/.test(assets.javascript[script])) {
                            return <script src={assets.javascript[script]} key={i} type="text/javascript"/>
                        }
                    })}
                </body>
            </html>
        );
    }
}


export default Html;
