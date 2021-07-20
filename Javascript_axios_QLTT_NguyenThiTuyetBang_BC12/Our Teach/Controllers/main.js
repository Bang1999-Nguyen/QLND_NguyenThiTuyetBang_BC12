var GetContent = new getContent();

// Set case for display item on the user's interface (get data from axios)
var renderData = function() {
    GetContent.getData().then(function(result){
        var Arr = [];
        result.data.forEach(function(data) {
            var {taiKhoan, matKhau, hoTen, email, loaiND,ngonNgu, moTa, hinhAnh } = data;
            if(loaiND === 'GV') {
                Arr.push(data);
            }
            renderHTML(Arr);
        })
    }).catch(function(error){
        console.log('Something went wrong');
    })
}
renderData();
// renderHTML to display data on the user's interface
var renderHTML = function(arr) {
    var content = [];
    arr.map(function(data, index) {
        content += `
        <div >
             <div class="content__item">
                    <div class="image__zoom">
                        <img class="img-fluid" src="img/${data.hinhAnh}">
                    </div>
                    <div class="content__detail">
                        <h4>${data.ngonNgu}</h4>
                        <h3>${data.hoTen}</h3>
                        <p>${data.moTa}</p>
                    </div>
                </div>
            </div>
        `;
    })
    document.querySelector('.tab__content').innerHTML = content;
}
