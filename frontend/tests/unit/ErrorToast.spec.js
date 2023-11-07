import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import ErrorToast from '@/components/Home/ErrorToast.vue';

describe('ErrorToast.vue', () => {
  it('displays an error toast when showError is true', () => {
    const wrapper = mount(ErrorToast, {
      propsData: { showError: true },
    });

    expect(wrapper.find('.toast').exists()).to.be.true;
    expect(wrapper.find('.alert-error').exists()).to.be.true;
    expect(wrapper.find('span').text()).to.equal('Please enter a valid link');
  });

  it('does not display an error toast when showError is false', () => {
    const wrapper = mount(ErrorToast, {
      propsData: { showError: false },
    });

    expect(wrapper.find('.toast').exists()).to.be.false;
  });
});
