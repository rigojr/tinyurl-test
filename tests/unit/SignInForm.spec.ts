import { shallowMount } from '@vue/test-utils';

import SignInForm from '@/components/SignInForm.vue';

describe('sign-in-form', () => {
  it('should mount component', () => {
    const wrapper = shallowMount(SignInForm);

    expect(wrapper.exists()).toStrictEqual(true);
  });

  it('should successfully submit the form', async () => {
    const expected = 'sign-in'; // TODO: could came from an enum.
    const wrapper = shallowMount(SignInForm);

    await wrapper.find('.sign-in-form').trigger('submit.prevent');

    expect(wrapper.emitted()).toHaveProperty(expected);
  });
});
