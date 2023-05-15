const Utility = {
  /**
   * 페이지네이션 구현 함수
   *
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

    setDefaultPage(number_defaultPageNumber);

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
        // 상위 요소 영역 중 버튼 외의 영역 클릭 시 핸들러 작동 방지
        if (e.target === e.currentTarget) {
          return;
        }

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
   * 특정 요소를 '장바구니 추가' 버튼으로 만드는 함수.
   * - 이 쇼핑몰이 아니면 사용 불가. 범용성 X.
   *  - 클릭되는 요소에 dataset 속성을 사용하여 localStorage cart에 필요한 특정 데이터들을 반환받기 때문.
   *    - 상품 데이터를 넘겨받기 위한 방법(dataset)이 하드 코딩으로 설정되어 있음.
   *    - 넘겨받을 상품 데이터 항목도 하드코딩으로 설정되어 있음.
   *    - 즉, 이걸 다른 데서도 사용하려면 데이터 반환 방법과 반환될 데이터 항목을 똑같이 설정해야 한다는 제약이 걸림.
   *
   * @param {'querySelector-selector'} cssSelector_targetElement
   * : '장바구니에 추가' 버튼으로 만들 요소들 지정에 사용.
   * ! querySelector/All의 () 안에 들어가는 형식으로 입력.
   * - 예) ('.pagination-ToHidden-unselectedData')
   */
  makeElementBecomeAddToCartButton(cssSelector_targetElement) {
    const targetElement = document.querySelectorAll(cssSelector_targetElement);

    getTargetElement();

    function getTargetElement() {
      // '장바구니 추가' 버튼으로 만들 요소가 한 개일 때
      // -> 요소 선택 메서드를 querySelector로 설정.
      if (targetElement.length === 1) {
        targetElement = document.querySelector(cssSelector_targetElement);

        addEventListenerToElement(targetElement);

        return;
      }

      // '장바구니 추가' 버튼으로 만들 요소가 여러 개일 때
      // -> 요소 선택 메서드를 querySelectorAll로 설정.
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
