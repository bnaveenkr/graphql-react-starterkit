import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Loader from 'components/Loader';

function setup(props) {
    return mount((
        <Loader {...props} />
    ));
}

describe('<Loader />', () => {

    it('should contain the loader', () => {
        const enzymeWrapper = setup();
        const loader = enzymeWrapper.find('div[data-test-id="loader"]');
        expect(loader.exists()).to.equal(true);
    });

});
