//임의로 덤미 만들기
const dummyData = [
    {
        date: "2023.04.26",
        orderName: "피카츄",
        count: 2,
        totalPrice: 2000
    },
    {
        date: "2023.04.22",
        orderName: "파이리",
        count: 1,
        totalPrice: 2000
    },
    {
        date: "2023.04.21",
        orderName: "캐터피",
        count: 1,
        totalPrice: 2000
    }
    ,
    {
        date: "2023.04.19",
        orderName: "병아리",
        count: 1,
        totalPrice: 4000
    }
    ,
    {
        date: "2023.04.26",
        orderName: "파이리",
        count: 2,
        totalPrice: 2000
    }
    
    
];

// 로컬에 저장하기
localStorage.setItem("orderDummy", JSON.stringify(dummyData));
const dummyStr = localStorage.getItem("orderDummy");
const updatedDummyObjStr = JSON.parse(dummyStr);
// console.log(updatedDummyObjStr);

// html에 뿌리기
if(updatedDummyObjStr) {
    const orderHtml = updatedDummyObjStr.map((obj, index) => `
    <tr>
    <td>${obj.date}</td>
    <td>${obj.orderName} / ${obj.count}마리</td>
    <td>${obj.totalPrice}</td>
    <td>
        <select id="items" class="items-management-orders" name="items">
            <option value="item1">상품준비중</option>
            <option value="item2">상품배송중</option>
            <option value="item3">배송완료</option>
          </select>
    </td>
    <td><button class="delete-btn" data-index="${index}">주문 취소</button></td>
    </tr>
    `).join("")

    const listOrder = document.querySelector("#list-orders");
    listOrder.innerHTML = orderHtml;
}

const dummyLength = updatedDummyObjStr.length;
const orderCount = document.querySelector("#order-count");

// 총주문수 체크
if (dummyLength > 0) {
    orderCount.innerHTML = dummyLength;
}

// 삭제 

 const deleteBtns = document.querySelectorAll(".delete-btn");
 deleteBtns.forEach(btn => {
   btn.addEventListener("click", function(e) {
     e.preventDefault();

     const index = parseInt(btn.dataset.index);
     console.log(index)

   // 해당 인덱스 삭제
     dummyData.splice(index, 1);
     const dummyObjStr = JSON.stringify(dummyData);
     localStorage.setItem("orderDummy", dummyObjStr);

     btn.closest("tr").remove();
   });
 });

 // 셀렉터 로컬에 저장하기
 const itemSelect = document.querySelector("#items");

 itemSelect.addEventListener("change", function(){
    const selectValue = itemSelect.value;
    console.log(selectValue);
    localStorage.setItem("selectItem", selectValue)
 })
