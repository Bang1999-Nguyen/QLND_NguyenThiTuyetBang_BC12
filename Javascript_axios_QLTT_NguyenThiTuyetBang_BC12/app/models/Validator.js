function Validator() {
    this.checkEmpty = function(value, spanId, mess) {
        if(!value) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.findPosition = function(taiKhoan){
        return getLocalStorage().findIndex(function(item){
            return String(taiKhoan) === String(item.taiKhoan);
        })
    }
    this.checkRepeat = function(taiKhoan, spanId, mess){
        var viTri = this.findPosition(taiKhoan);
        if(viTri !== -1){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.checkCharacter = function(value, spanId, mess) {
        var letter = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if(letter.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.checkPassword = function(value, spanId, mess){
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if(value.match(password)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.checkLength = function(value, spanId, mess, min , max) {
        if(value.length >= min && value.length <= max){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.checkEmail = function(value, spanId, mess){
        var email = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if(email.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.checkSelect = function(value, spanId, mess){
        if(value.selectedIndex == 0){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.checkReduplicate = function(value, data, spanId, mess){
        var position = this.findPosition(value);
        if(value !== data && position !== -1){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }

}