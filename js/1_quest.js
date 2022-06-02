
class ComponentError extends Error { }

export default class BaseComponent {
  constructor(selector, showLoader = true, showErrorState = true) {
    if (!selector) throw new ComponentError()
    this.selector = selector;
    this.showLoader = showLoader
    this.showErrorState = showErrorState
  }

  async getElement() {
    this.body = document.createElement('div')
    this.showLoader ? this.spinner.style.display = '' : this.spinner.style.display = 'none'
    try {
      await this.tryFetch()

    } finally {

      this.selector.append(this.body)
    }
  }

  spinner = document.querySelector('.spinner-border')

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  async fetch() {
    await this.wait(1000);
    this.spinner.style.display = 'none'

  }

  async tryFetch() {
    try {
      await this.fetch()

    } catch (err) {
      this.spinner.style.display = 'none'
      this.createBtn()
      this.showErrorState ? this.craeteErrorText(`${err.name}: ${err.message}`) : 1
    }

  }

  craeteErrorText(text) {
    const error = document.createElement('div')
    error.classList.add('btn', 'btn-secondary')
    error.style = 'position: fixed; bottom: 0; right: 0;'
    error.textContent = text
    this.body.append(error)
    this.error = error
  }

  createBtn() {
    const btn = document.createElement('button')
    btn.classList.add('btn', 'btn-primary')
    btn.textContent = 'Try one more'
    this.body.append(btn)
    this.btn = btn
    this.btn.addEventListener('click', async () => (this.body.remove(), await this.getElement()))
  }
}
