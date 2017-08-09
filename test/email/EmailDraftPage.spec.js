import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { EmailDraftPage } from '../../src/email/EmailDraftPage';

test('renders properly', t => {
    const wrapper = shallow(
        <EmailDraftPage />
    );

    //Two buttons: Submit & Update
    t.truthy(true);
});

test.todo('emaildraftpage tests');
