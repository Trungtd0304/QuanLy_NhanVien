// Tạo lớp đối tượng nhân viên
function NhanVien(
  _tkNV,
  _tenNV,
  _email,
  _matKhau,
  _ngayVaoLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.tkNV = _tkNV;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayVaoLam = _ngayVaoLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  // Tạo xếp loại nhân viên
  this.xepLoai = "";
  this.xepHang = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = "nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      this.xepLoai = "nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      this.xepLoai = "nhân viên khá";
    } else {
      this.xepLoai = "nhân viên trung bình";
    }
    return this.xepLoai;
  };

  // Tạo hàm tính tổng lương
  this.tongLuong = 0;
  this.tinhLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = parseFloat(this.luongCB) * 3;
    }
    if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = parseFloat(this.luongCB) * 2;
    }
    if (this.chucVu === "Nhân viên") {
      this.tongLuong = parseFloat(this.luongCB);
    }
    return this.tongLuong;
  };
}
