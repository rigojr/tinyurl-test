import { shallowMount } from '@vue/test-utils';

import CookieNotification from '@/components/CookieNotification.vue';

describe('cookie-notification', () => {
  it('should mount component', () => {
    const wrapper = shallowMount(CookieNotification);

    expect(wrapper.exists()).toStrictEqual(true);
  });

  it('should emits accepted event when accept button is clicked', async () => {
    const expected = 'accepted';
    const wrapper = shallowMount(CookieNotification);

    await wrapper.get('.cookie-notification__accept-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty(expected);
    expect(wrapper.emitted(expected)?.length).toStrictEqual(1);
  });

  it('should emits rejected event when accept button is clicked', async () => {
    const expected = 'rejected';
    const wrapper = shallowMount(CookieNotification);

    await wrapper.get('.cookie-notification__close-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty(expected);
    expect(wrapper.emitted(expected)?.length).toStrictEqual(1);
  });
});
