const Utility = {
  /**
   * @param {'querySelector-selector'} csslector_elementToInsertPaginationButton
   * : pagination-button 삽입 컨테이너 요소 지정에 사용.
   * : pagination-button click event 감지를 위한 부모 요소 지정에 사용.
   * ! querySelector/All의 () 안에 들어가는 형식으로 입력.
   * - 예) ('.container-paginationButton')
   *
   * @param {'querySelector-selector'} cssSelector_dataToPaginate
   * : pagination 대상 데이터 요소들 지정에 사용.
   * ! querySelector/All의 () 안에 들어가는 형식으로 입력.
   * - 예) ('.productListByCategory-list-li')
   *
   * @param {number} number_amoutDataPerPage
   * : 한 페이지당 표시될 데이터 요소 개수 설정.
   * - 예) (10)
   *
   * @param {'class-name'} className_ForSelectedPaginationButton
   * : 클릭된 pagination-button에 부여될 class 설정에 사용.
   * ! '클래스명' 형식으로 입력.
   * - 예) ('pagination-button-selected')
   *
   * @param {'class-name'} className_ForUnselectedDataToPaginate
   * : pagination 대상 데이터 중 감춰질 요소들에 부여될 class 설정에 사용.
   * ! '클래스명' 형식으로 입력.
   * - 예) ('data-to-pagenate-hidden')
   *
   * * @param {number} number_defaultPageNumber
   * : 첫 화면에서 보여질 페이지 번호 기본값 설정에 사용.
   * - 예) 1
   */
  makePagination(
    cssSelector_elementToInsertPaginationButton,
    cssSelector_dataToPaginate,
    number_amoutDataPerPage,
    className_ForSelectedPaginationButton,
    className_ForUnselectedDataToPaginate,
    number_defaultPageNumber,
  ) {
    createPaginationButton();

    addEventListenerToPaginationButton();

    setDefaultPage(number_defaultPageNumber);

    const elementToInsertPaginationButton = document.querySelector(
      cssSelector_elementToInsertPaginationButton,
    );
    const dataToPaginate = document.querySelectorAll(
      cssSelector_dataToPaginate,
    );
    const amountData = dataToPaginate.length;
    const amountDataPerPage = number_amoutDataPerPage;

    const amountPaginationButton = Math.ceil(amountData / amountDataPerPage);

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

    function setDefaultPage(number_defaultPageNumber) {
      addAndRemoveClasstoApplyCssToSelectedPaginationButton(
        number_defaultPageNumber,
      );
      addAndRemoveClassToApplyCssToUnselectedDataToPagenate(
        number_defaultPageNumber,
      );
    }
  },

  /**
   * 요소에 '장바구니에 추가'
   * @param {'querySelector-selector'} cssSelector_parentElementOfTargetElement
   * : '장바구니에 추가' 버튼으로 만들 요소들이 모두 담긴 상위 요소 지정에 사용.
   * ! 이 파라미터 입력 시 '장바구니에 추가' 버튼으로 만들 요소들을 모두 포함하는 상위 요소에만 event listener가 부착됨.
   * ! '장바구니에 추가' 버튼으로 만들 각각의 요소들에 event listener를 부착하고 싶다면 비워둘 것.
   * ! querySelector/All의 () 안에 들어가는 형식으로 입력.
   * - 예) ('.productListByCategory-list-ul')
   *
   * @param {'querySelector-selector'} cssSelector_targetElement
   * : '장바구니에 추가' 버튼으로 만들 요소들 지정에 사용.
   * ! querySelector/All의 () 안에 들어가는 형식으로 입력.
   * - 예) ('.pagination-ToHidden-unselectedData')
   */
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
