function DanhSach() {
    this.layDSND = function() {
        return axios({
            url: 'https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung',
            method: 'GET',
        })
    }
    this.themNguoiDung = function(nd) {
        return axios({
            url: 'https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung',
            method: 'POST',
            data: nd,
        })
    }
    this.xoaNguoiDung = function(id) {
        return axios({
            url: `https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung/${id}`,
            method: 'DELETE',
        })
    }
    this.xemNguoiDung = function(id) {
        return axios({
            url: `https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung/${id}`,
            method: 'GET',
        })
    }
    this.capNhatNguoiDung = function(id, nd) {
        return axios({
            url: `https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung/${id}`,
            method: 'PUT',
            data: nd,
        })
    }
    this.timNguoiDung = function(arr, chuoiTK) {
        return arr.filter(function(data) {
            return data.loaiND.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
        })
    }
    
}