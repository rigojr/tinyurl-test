import { shallowMount } from '@vue/test-utils';

import SignInForm from '@/components/SignInForm.vue';

describe('sign-in-form', () => {
  it('should mount component', () => {
    const wrapper = shallowMount(SignInForm);

    expect(wrapper.find('.sign-in-form').exists()).toStrictEqual(true);
  });

  it('should successfully submit the form', async () => {
    const expected = 'sign-in'; // TODO: could came from an enum.
    const wrapper = shallowMount(SignInForm);

    await wrapper.find('.sign-in-form__input-name').setValue('test-name');
    await wrapper.find('.sign-in-form__input-password').setValue('goodPassword!');
    await wrapper.find('.sign-in-form').trigger('submit.prevent');

    expect(wrapper.emitted()).toHaveProperty(expected);
    expect(wrapper.find('.sing-in-form__message--error').exists()).toStrictEqual(false);
  });

  it('should show error message when name is not valid', async () => {
    const wrapper = shallowMount(SignInForm);

    await wrapper.find('.sign-in-form__input-name').setValue('');
    await wrapper.find('.sign-in-form__input-password').setValue('goodPassword!');
    await wrapper.find('.sign-in-form').trigger('submit.prevent');

    expect(wrapper.find('.sign-in-form__message--error').exists()).toStrictEqual(true);
  });

  it('should show error message when password is not valid', async () => {
    const wrapper = shallowMount(SignInForm);

    await wrapper.find('.sign-in-form__input-name').setValue('test-name');
    await wrapper.find('.sign-in-form__input-password').setValue('illpassword');
    await wrapper.find('.sign-in-form').trigger('submit.prevent');

    expect(wrapper.find('.sign-in-form__message--error').exists()).toStrictEqual(true);
  });
});
