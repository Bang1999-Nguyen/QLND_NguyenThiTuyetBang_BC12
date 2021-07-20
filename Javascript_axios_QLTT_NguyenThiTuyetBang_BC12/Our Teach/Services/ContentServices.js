function getContent() {
    this.getData = function() {
        return axios({
            url: 'https://60dc6924c2b6280017feb97f.mockapi.io/Quanlynguoidung',
            method: 'GET',
        })
    }
}