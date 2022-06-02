import BaseComponent from './1_quest.js'

export default class AddToCartComponent extends BaseComponent {

  productsApi = 0

  async fetch() {

    await super.fetch()
    this.productQuantity = this.productsApi
    !!this.product ? (this.product.remove(), this.createProductElement()) : 1
  }

  async getElement() {

    await super.getElement()
    this.createProductElement()
    return this.body
  }

  createProductElement() {

    const product = document.createElement('div'),
      btnBox = document.createElement('div'),
      productQuantity = document.createElement('span'),
      btnAdd = document.createElement('button'),
      btnPlus = document.createElement('button'),
      btnMinus = document.createElement('button')

    btnBox.classList.add('btn-group')
    btnAdd.classList.add('btn', 'btn-warning')
    btnPlus.classList.add('btn', 'btn-success')
    btnMinus.classList.add('btn', 'btn-danger')
    productQuantity.classList.add('btn', 'btn-warning', 'px-3', 'align-center', 'align-middle')


    productQuantity.textContent = this.productQuantity
    btnPlus.textContent = '+'
    btnMinus.textContent = '-'
    btnAdd.textContent = 'Добавить в корзину'

    btnBox.append(btnMinus, productQuantity, btnPlus)

    Array.from([btnMinus, btnPlus, btnAdd]).forEach((btn, index) => btn.addEventListener('click', () => this.clickBtn = index))
    !!this.product ? this.product.remove() : 1
    this.product = product
    this.productQuantity > 0 ? this.product.append(btnBox) : this.product.append(btnAdd)
    this.body.append(this.product)
  }

  set clickBtn(index) {
    index > 0 ? this.productQuantity++ : this.productQuantity--;

    this.createProductElement()
  }

  set productQuantity(number) {

    this._productQuantity = number < 0 ? 0 : number
  }

  get productQuantity() {
    this.productsApi = this._productQuantity
    return this._productQuantity
  }

}
