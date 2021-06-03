function DanhSachNhanVien() {
  this.list = [];
  this.themNhanVien = function (nv) {
    this.list.push(nv);
  };
  this._timViTri = function (maNV) {
    /**
     * tìm vị trí maNV muốn xoá thông qua mảng list
     * 1. duyệt mảng this.list
     * 2. nếu item.tkNV == maNV => xoá index(i)
     * 3. splice (index,i)
     */
    var index = -1;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].tkNV == maNV) {
        index = i;
        break;
      }
    }
    return index;
  };
  this._xoaNhanVien = function (maNV) {
    var index = this._timViTri(maNV);
    // Xoá nhâns vien
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };

  this._capNhatNhanVien = function (nhanVien) {
    // lấy vị trí
    var index = this._timViTri(nhanVien.tkNV);
    if (index !== -1) {
      this.list[index] = nhanVien;
    }
  };
}
DanhSachNhanVien.prototype.layThongTinNhanVien = function (maNV) {
  //lấy vị trí
  var index = this._timViTri(maNV);
  if (index !== -1) {
    return this.list[index];
  }
};
DanhSachNhanVien.prototype.timKimXepLoai = function (keyWord) {
  var mangTimKiem = [];
  for (var i = 0; i < this.list.length; i++) {
    if (
      this.list[i].xepLoai.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
    ) {
      mangTimKiem.push(this.list[i]);
    }
  }
  return mangTimKiem;
};
