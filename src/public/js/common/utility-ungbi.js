const Utility = {
  /**
   * @param {querySelector-selector} csslector_elementToInsertPaginationButton
   * : pagination button 삽입 컨테이너 요소 지정에 사용.
   * : pagination button click event 감지를 위한 부모 요소 지정에 사용.
   * ! querySelector/All의 () 안에 들어갈 형태로 입력.
   *  - 예) '.productListByCategory-list-ul'
   * @param {querySelector-selector} cssSelector_dataToPaginate
   * : pagination 대상 데이터 요소들 지정에 사용.
   * ! querySelector/All의 () 안에 들어갈 형태로 입력.
   * @param {number} number_amoutDataPerPage
   * :
   * @param {*} className_ForSelectedPaginationButton
   * @param {*} className_ForUnselectedDataToPaginate
   * @param {*} number_defaultPaginationButton
   */
  makePagination(
    cssSelector_elementToInsertPaginationButton,
    cssSelector_dataToPaginate,
    number_amoutDataPerPage,
    className_ForSelectedPaginationButton,
    className_ForUnselectedDataToPaginate,
    number_defaultPaginationButton,
  ) {
    const elementToInsertPaginationButton = document.querySelector(
      cssSelector_elementToInsertPaginationButton,
    );
    const dataToPaginate = document.querySelectorAll(
      cssSelector_dataToPaginate,
    );
    const amountData = dataToPaginate.length;
    const amountDataPerPage = number_amoutDataPerPage;

    const amountPaginationButton = Math.ceil(amountData / amountDataPerPage);

    createPaginationButton();

    addEventListenerToPaginationButton();

    addAndRemoveClasstoApplyCssToSelectedPaginationButton(
      number_defaultPaginationButton,
    );

    addAndRemoveClassToApplyCssToUnselectedDataToPagenate(
      number_defaultPaginationButton,
    );

    function createPaginationButton() {
      elementToInsertPaginationButton.textContent = '';

      for (i = 1; i <= amountPaginationButton; i++) {
        const eachPaginationButton = document.createElement('button');

        eachPaginationButton.textContent = i;
        eachPaginationButton.classList.add('paginationButton');
        eachPaginationButton.dataset.id = i;

        elementToInsertPaginationButton.insertAdjacentElement(
          'beforeend',
          eachPaginationButton,
        );
      }
    }

    function addEventListenerToPaginationButton() {
      elementToInsertPaginationButton.addEventListener('click', e => {
        const selectedPaginationButtonNumber = Number(e.target.dataset.id);
        const buttonNumber = Number(e.target.dataset.id);

        addAndRemoveClasstoApplyCssToSelectedPaginationButton(
          selectedPaginationButtonNumber,
        );

        addAndRemoveClassToApplyCssToUnselectedDataToPagenate(buttonNumber);
      });
    }

    function addAndRemoveClasstoApplyCssToSelectedPaginationButton(
      selectedPaginationButtonNumber,
    ) {
      const paginationButton = document.querySelectorAll('.paginationButton');
      const selectedPaginationButton =
        paginationButton[selectedPaginationButtonNumber - 1];

      paginationButton.forEach(item => {
        item.classList.remove(className_ForSelectedPaginationButton);
      });

      selectedPaginationButton.classList.add(
        className_ForSelectedPaginationButton,
      );
    }

    function addAndRemoveClassToApplyCssToUnselectedDataToPagenate(
      buttonNumber,
    ) {
      dataToPaginate.forEach(item => {
        item.classList.add(className_ForUnselectedDataToPaginate);
      });

      for (
        i = (buttonNumber - 1) * amountDataPerPage;
        i < buttonNumber * amountDataPerPage;
        i++
      ) {
        dataToPaginate[i].classList.remove(
          className_ForUnselectedDataToPaginate,
        );
      }
    }
  },

  makeElementBecomeAddToCartButton(
    cssSelector_parentElementOfTargetElement,
    cssSelector_targetElement,
  ) {
    getTargetElement();

    function getTargetElement() {
      if (!!cssSelector_parentElementOfTargetElement) {
        const parentElementOfTargetElement = document.querySelector(
          cssSelector_parentElementOfTargetElement,
        );

        addEventListenerToElement(parentElementOfTargetElement);

        return;
      }

      const targetElement = document.querySelectorAll(
        cssSelector_targetElement,
      );

      if (targetElement.length === 1) {
        targetElement = document.querySelector(cssSelector_targetElement);

        addEventListenerToElement(targetElement);

        return;
      }

      targetElement.forEach(item => {
        const eachTargetElement = item;

        addEventListenerToElement(eachTargetElement);

        return;
      });
    }

    function addEventListenerToElement(element) {
      element.addEventListener('click', e => {
        let { _id, name, price } = e.target.dataset;
        _id = Number(_id);

        addProudctToCart(_id, name, price);
      });
    }

    function addProudctToCart(_id, name, price) {
      let cartData = getCartData();

      const productData = { _id, name, price };
      const productDataForCart = convertProductDataForCart(productData);

      if (!isCart()) {
        createCartStorage(productDataForCart);

        return;
      }

      const alreadyInCartDataIndex = cartData.findIndex(
        item => item._id === _id,
      );

      if (alreadyInCartDataIndex === -1) {
        cartData.push(productDataForCart);

        const updatedCartData = cartData;

        setCartStorage(updatedCartData);

        return;
      }

      cartData[alreadyInCartDataIndex].quantity++;

      const updatedCartData = cartData;

      setCartStorage(updatedCartData);

      return;
    }

    function getCartData() {
      let cartData = JSON.parse(localStorage.getItem('cart'));

      return cartData;
    }

    function convertProductDataForCart(productData) {
      const { _id, name, price, quantity = 1, checked = true } = productData;

      const productDataForCart = { _id, name, price, quantity, checked };

      return productDataForCart;
    }

    function isCart() {
      const cartData = JSON.parse(localStorage.getItem('cart'));
      if (cartData === null) {
        return false;
      }

      return true;
    }

    function createCartStorage(firstProductDataForCart) {
      localStorage.setItem('cart', JSON.stringify([firstProductDataForCart]));
    }

    function setCartStorage(productDataForCart) {
      localStorage.setItem('cart', JSON.stringify(productDataForCart));
    }
  },
};

export { Utility };
