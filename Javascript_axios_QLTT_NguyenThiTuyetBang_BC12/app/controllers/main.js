var getEle = function(id) {
    return document.getElementById(id);
}
// List
var danhSach = new DanhSach();
// Validator
var validator = new Validator();

// Get list all user from axios
var layDSND = function() {
    danhSach.layDSND().then(function(result){
        // console.log(result.data);
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    .catch(function(error) {
        console.log('Something went wrong');
    })
}
layDSND();
// Solve the button to add users
getEle('btnThemNguoiDung').addEventListener('click', function() {
    document.querySelector('#formUser').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class="btn btn-success" onclick="themNguoiDung()">Thêm người dùng</button>`;
})

// RenderHTML to display list all users on the user's interface
function renderTable(mangND) {
    var content = '';
    mangND.map(function(nd, index){
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${nd.taiKhoan}</td>
            <td>${nd.matKhau}</td>
            <td>${nd.hoTen}</td>
            <td>${nd.email}</td>
            <td>
            <img style="width:150px;height:100px" src="../../assets/img/${nd.hinhAnh}"/>
            </td>
            <td>${nd.ngonNgu}</td>
            <td>${nd.loaiND}</td>
            <td>${nd.moTa}</td>
            <td>
                <button style="margin:5px 0;width:60px" class="btn btn-danger" onclick= "xoaNguoiDung('${nd.id}')">Xóa</button>
                <button style="margin:5px 0;width:60px" class="btn btn-success" onclick="xemNguoiDung('${nd.id}')" data-toggle="modal"
                data-target="#myModal">Xem</button>
            </td>
        <tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}
// GetLocalStorage
function setLocalStorage(dsnd){
    localStorage.setItem('DSND', JSON.stringify(dsnd));
}
// GetLocalStorage
function getLocalStorage() {
    if(localStorage.getItem('DSND')){
        return JSON.parse(localStorage.getItem
            ('DSND'));
    }
}
// Add user
var themNguoiDung = function() {
    var taiKhoan = String(getEle('TaiKhoan').value);
    var hoTen = String(getEle('HoTen').value);
    var matKhau = String(getEle('MatKhau').value);
    var email = String(getEle('Email').value);
    var hinhAnh = String(getEle('HinhAnh').value);
    var loaiND = String(getEle('loaiNguoiDung').value);
    var ngonNgu = String(getEle('loaiNgonNgu').value);
    var moTa = String(getEle('MoTa').value);
    var KTHopLe = kiemTraHopLe();
    if(KTHopLe){
    var nguoiDung = new user(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    danhSach.themNguoiDung(nguoiDung).then(function(result){
        layDSND();
        // Hide modal after modify success
        document.querySelector('#myModal .close').click();
    })
    .catch(function(error) {
        console.log('Something went wrong');
        })
    }
}

// Delete user
var xoaNguoiDung = function(id) {
    danhSach.xoaNguoiDung(id).then(function(result){
        layDSND();
    })
    .catch(function(error) {
        console.log('Something went wrong');
    })
}

// View data of user
var xemNguoiDung = function(id) {
    danhSach.xemNguoiDung(id).then(function(result){
        var nd  = result.data;
        getEle('TaiKhoan').value= String(nd.taiKhoan);
        getEle('HoTen').value = String(nd.hoTen);
        getEle('MatKhau').value = String(nd.matKhau);
        getEle('Email').value= String(nd.email);
        getEle('HinhAnh').value = String(nd.hinhAnh);
        getEle('loaiNguoiDung').value = String(nd.loaiND);
        getEle('loaiNgonNgu').value= String(nd.ngonNgu);
        getEle('MoTa').value = String(nd.moTa);
        // Solve the button to change
        var modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatNguoiDung('${nd.id}')">Cập nhật</button>`;
    })
    .catch(function(error) {
        console.log('Something went wrong');
    })
}

// Modify user
var capNhatNguoiDung = function(id) {
    var taiKhoan = String(getEle('TaiKhoan').value);
    var hoTen = String(getEle('HoTen').value);
    var matKhau = String(getEle('MatKhau').value);
    var email = String(getEle('Email').value);
    var hinhAnh = String(getEle('HinhAnh').value);
    var loaiND = String(getEle('loaiNguoiDung').value);
    var ngonNgu = String(getEle('loaiNgonNgu').value);
    var moTa = String(getEle('MoTa').value);
    var checkResult = checkInput();
    if(checkResult){
    var nguoiDung = new user(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    danhSach.xemNguoiDung(id).then(result => {
        var nd = result.data;
        danhSach.capNhatNguoiDung(id, nguoiDung).then(function(result){
            var isValid = true;
            isValid &= validator.checkEmpty(taiKhoan, 'tbtaiKhoan', '(*) Tên tài khoản không được rỗng')
                    && validator.checkReduplicate(nguoiDung.taiKhoan,nd.taiKhoan, 'tbtaiKhoan', '(*) Tên tài khoản không được trùng');
            if(!isValid) return;
            layDSND();
             // Hide modal after modify success
            document.querySelector('#myModal .close').click();
        })
    })
    .catch(function(error) {
        console.log('Something went wrong');
        })
    }
}
// Search user by kind of users
var timNguoiDung = function() {
    var arr = getLocalStorage();
    var chuoiTK = getEle('selectKind').value;
    if(chuoiTK === 'all'){
        renderTable(arr);
    }else{
        var mangTK = danhSach.timNguoiDung(arr, chuoiTK);
        renderTable(mangTK);
    }
}
getEle('selectKind'),addEventListener('click', timNguoiDung);

// Enter data by keyup
document.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
    var taiKhoan = String(getEle('TaiKhoan').value);
    var hoTen = String(getEle('HoTen').value);
    var matKhau = String(getEle('MatKhau').value);
    var email = String(getEle('Email').value);
    var hinhAnh = String(getEle('HinhAnh').value);
    var loaiND = String(getEle('loaiNguoiDung').value);
    var ngonNgu = String(getEle('loaiNgonNgu').value);
    var moTa = String(getEle('MoTa').value);
    var nguoiDung = new user(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    danhSach.themNguoiDung(nguoiDung).then(function(result){
        layDSND();
        // Hide modal after modify success
        document.querySelector('#myModal .close').click();
    })
    .catch(function(error) {
        console.log('Something went wrong');
        })
    }
})
// Validate input 
function kiemTraHopLe() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung');
    var ngonNgu = getEle('loaiNgonNgu');
    var moTa = getEle('MoTa').value;
    var isValid = true;
    isValid &= validator.checkEmpty(taiKhoan, 'tbtaiKhoan', '(*) Tên tài khoản không được rỗng')
        && validator.checkRepeat(taiKhoan,'tbtaiKhoan', '(*) Tên tài khoản không được trùng');
    isValid &= validator.checkEmpty(hoTen, 'tbhoTen', '(*) Họ tên không được rỗng')
        && validator.checkCharacter(hoTen, 'tbhoTen', '(*) Họ tên không được chứa số và kí tự đặc biệt');
    isValid &= validator.checkEmpty(matKhau, 'tbmatKhau', '(*) Mật khẩu không được rỗng')
        && validator.checkPassword(matKhau, 'tbmatKhau', '(*) Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài 6-8')
        && validator.checkLength(matKhau, 'tbmatKhau', '(*) Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài 6-8', 6, 8);
    isValid &= validator.checkEmpty(email, 'tbemail', '(*) Email không được rỗng')
        && validator.checkEmail(email, 'tbemail', '(*) Email phải đúng format email');
    isValid &= validator.checkEmpty(hinhAnh, 'tbhinhAnh', '(*) Hình ảnh không được rỗng');
    isValid &= validator.checkSelect(loaiND, 'tbloaiND', '(*) Vui lòng chọn loại người dùng');
    isValid &= validator.checkSelect(ngonNgu, 'tbNN', '(*) Vui lòng chọn ngôn ngữ');
    isValid &= validator.checkEmpty(moTa, 'tbmoTa', '(*) Mô tả không được để trống') 
            && validator.checkLength(moTa,'tbmoTa', '(*) Mô tả không vượt quá 60 kí tự', 0, 60);
    if(!isValid) return;
    return isValid;
}
// Validate for modify
function checkInput() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung');
    var ngonNgu = getEle('loaiNgonNgu');
    var moTa = getEle('MoTa').value;
    var isValid = true;
    isValid &= validator.checkEmpty(hoTen, 'tbhoTen', '(*) Họ tên không được rỗng')
        && validator.checkCharacter(hoTen, 'tbhoTen', '(*) Họ tên không được chứa số và kí tự đặc biệt');
    isValid &= validator.checkEmpty(matKhau, 'tbmatKhau', '(*) Mật khẩu không được rỗng')
        && validator.checkPassword(matKhau, 'tbmatKhau', '(*) Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài 6-8')
        && validator.checkLength(matKhau, 'tbmatKhau', '(*) Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài 6-8', 6, 8);
    isValid &= validator.checkEmpty(email, 'tbemail', '(*) Email không được rỗng')
        && validator.checkEmail(email, 'tbemail', '(*) Email phải đúng format email');
    isValid &= validator.checkEmpty(hinhAnh, 'tbhinhAnh', '(*) Hình ảnh không được rỗng');
    isValid &= validator.checkSelect(loaiND, 'tbloaiND', '(*) Vui lòng chọn loại người dùng');
    isValid &= validator.checkSelect(ngonNgu, 'tbNN', '(*) Vui lòng chọn ngôn ngữ');
    isValid &= validator.checkEmpty(moTa, 'tbmoTa', '(*) Mô tả không được để trống') 
            && validator.checkLength(moTa,'tbmoTa', '(*) Mô tả không vượt quá 60 kí tự', 0, 60);
    if(!isValid) return;
    return isValid;
}


