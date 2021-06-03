function Validation() {
  // kiểm tra người dùng có để trống
  this.kiemTraTrong = function (input, divId, mess) {
    if (input.trim() === "") {
      // thông báo lỗi
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    } else {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
  };
  this.kiemTraChucVu = function (idslect, divId, mess) {
    if (getEle(idslect).selectedIndex != 0) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraKyTu = function (input, divId, mess, max, min) {
    if (input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraTenNhanVien = function (input, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraEmail = function (input, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraMatKhau = function (input, divId, mess, max, min) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(letter) && input.length >= min && input.length <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraLuong = function (input, divId, mess, max, min) {
    if (input >= min && input <= max) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  this.kiemTraMaTrung = function (input, divId, mess, arr) {
    /**
     * 1. duyệt mãng ar
     * 2. nếu như item.maSV trùng với input
     *    => trùng mã sv => false
     * 3. ngược lại => k Trùng => true
     */
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].tkNV === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
}
