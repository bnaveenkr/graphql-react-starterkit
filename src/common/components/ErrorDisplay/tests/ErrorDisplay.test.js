import React from 'react';
import casual from 'casual';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import ErrorDisplay from '../';
import { ERROR_UNKNOWN } from 'utils/responseMessages';

function setup(props) {
    return mount(<ErrorDisplay {...props} />);
}

describe('<ErrorDisplay />', () => {
    const props = {
        active: false,
        allowRefetch: false,
    };
    it('should not display if active is false', () => {
        const wrapper = setup(props);
        const child = wrapper.find('p[data-test-id="error-message"]');
        expect(child).to.have.length(0);
    });
    it('should display the error message provided in props', () => {
        const message = casual.sentence;
        const wrapper = setup({ ...props, ...{ active: true, message }});
        const child = wrapper.find('p[data-test-id="error-message"]');
        expect(child.text()).to.equal(message);
    });

    it('should display the default error message if props do not contain message', () => {
        const wrapper = setup({ ...props, ...{ active: true }});
        const child = wrapper.find('p[data-test-id="error-message"]');
        expect(child.text()).to.equal(ERROR_UNKNOWN);
    });

    it('should show the refetch button if props have allowRefetch', () => {
        const refetch = sinon.spy();
        const wrapper = setup({ ...props, ...{ active: true, allowRefetch: true, refetch }});
        const refreshButton = wrapper.find('button[data-test-id="route-refresh-button"]');
        expect(refreshButton).to.have.length(1);
        refreshButton.simulate('click');
        expect(refetch).to.have.property('callCount', 1);
    });

    it('should not display the refetch button if props do not have allowRefetch', () => {
        const wrapper = setup(props);
        const refreshButton = wrapper.find('button[data-test-id="route-refresh-button"]');
        expect(refreshButton).to.have.length(0);

    });

});
