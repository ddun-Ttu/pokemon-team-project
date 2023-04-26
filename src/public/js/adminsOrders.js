//임의로 덤미 만들기
const dummyData = [
    {
        date: "2023.04.26",
        orderName: "Pikachu",
        count: 2,
        totalPrice: 2000
    }
];

// 로컬에 저장하기
localStorage.setItem("orderDummy", JSON.stringify(dummyData));
const dummyStr = localStorage.getItem("orderDummy");
const updatedDummyObjStr = JSON.parse(dummyStr);
console.log(updatedDummyObjStr);

// html에 뿌리기
if(updatedDummyObjStr) {
    const orderHtml = updatedDummyObjStr.map((obj, index) => `
    <td>2023-04-20</td>
    <td>피카츄/ 1마리</td>
    <td>상품 준비중</td>
    <td>
        <select id="items" class="items-management-orders" name="items">
            <option value="item1">상품준비중</option>
            <option value="item2">상품배송중</option>
            <option value="item3">배송완료</option>
          </select>
    </td>
    <td><button class="btn-my-orders">주문 취소</button></td>
    `)
}
