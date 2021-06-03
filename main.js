// Tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
var dsnv = new DanhSachNhanVien();
// Tạo hàm kiểm tra validation
var validation = new Validation();

/**
 * lấy data từ localStorage show ra ngoài table
 */

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
  // tạo hàm rút gon phần document.getElementById
}
function creEle(id) {
  return document.createElement(id);
  // tạo hàm rút gọn document.createElement
}
// hàm lấy dữ liệu đầu vào
function layDuLieuDauVao(isAdd) {
  // Lấy thông tin nhân viên nhập vào từ người dùng
  var _tkNV = getEle("tknv").value;
  var _tenNV = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayVaoLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  // kiểm tra validation
  var isValid = true;
  // validation của tk nhân viên
  if (isAdd) {
    isValid &=
      validation.kiemTraTrong(
        _tkNV,
        "tbTKNV",
        "()* Tài khoản nhân viên không được để trống "
      ) &&
      validation.kiemTraKyTu(
        _tkNV,
        "tbTKNV",
        "()* Độ dài ký tự từ 4-10",
        10,
        4
      ) &&
      validation.kiemTraMaTrung(
        _tkNV,
        "tbTKNV",
        "()* Tài khoản đã tồn tại ",
        dsnv.list
      );
  }

  // validation của tên nhân viên
  isValid &=
    validation.kiemTraTrong(
      _tenNV,
      "tbTen",
      "()* Tên nhân viên không được để trống "
    ) &&
    validation.kiemTraTenNhanVien(
      _tenNV,
      "tbTen",
      "()* Tên nhân viên không hợp lệ "
    );

  // validation của emal nhân viên
  isValid &=
    validation.kiemTraTrong(
      _email,
      "tbEmail",
      "()* Email không được để trống "
    ) && validation.kiemTraEmail(_email, "tbEmail", "()* Email không hợp lệ ");

  // validation mật khẩu của nhân viên
  isValid &=
    validation.kiemTraTrong(
      _matKhau,
      "tbMatKhau",
      "()* Mật khẩu được để trống "
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "tbMatKhau",
      "()* Độ dài ký tự từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)",
      10,
      6
    );

  // validation ngày vào làm của nhân viên
  isValid &= validation.kiemTraTrong(
    _ngayVaoLam,
    "tbNgay",
    "()* Ngày không không được để trống "
  );

  // validation lương cơ bản của nhân viên
  isValid &=
    validation.kiemTraTrong(
      _luongCB,
      "tbLuongCB",
      "()* Lương cơ bản không được để trống "
    ) &&
    validation.kiemTraLuong(
      _luongCB,
      "tbLuongCB",
      "()* Lương cơ bản từ 1tr đến 20tr ",
      20000000,
      1000000
    );

  // validation tổng giờ làm của nhân viên
  isValid &=
    validation.kiemTraTrong(
      _gioLam,
      "tbGiolam",
      "()* Giờ làm không được để trống "
    ) &&
    validation.kiemTraLuong(
      _gioLam,
      "tbGiolam",
      "()* Giờ làm từ 80 đến 200 ",
      200,
      80
    );

  // validation tổng giờ làm của nhân viên
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "()* Vui lòng chọn chức vụ "
  );

  if (isValid) {
    var nhanVien = new NhanVien(
      _tkNV,
      _tenNV,
      _email,
      _matKhau,
      _ngayVaoLam,
      _luongCB,
      _chucVu,
      _gioLam
    );
    return nhanVien;
  }
  return null;
}

// Thêm nhân viên mới
getEle("btnThemNV").addEventListener("click", function (event) {
  //chặn trnag load lại
  event.preventDefault();
  var nhanVien = layDuLieuDauVao(true);

  if (nhanVien) {
    // Gọi hàm xếp hạng và tính lương cho nhân viên
    nhanVien.xepHang();
    nhanVien.tinhLuong();

    dsnv.themNhanVien(nhanVien);

    taoBang(dsnv.list);
    //lưu mảng list
    setLocalStorage();
  }
});

// Tạo hàm hiển thị bảng
function taoBang(mang) {
  getEle("tableDanhSach").innerHTML = "";
  for (var i = 0; i < mang.length; i++) {
    // Tạo dòng trong tbody
    var tabTR = creEle("tr");

    // Tạo cột
    var tabTD_TkNV = creEle("td");
    var tabTD_TenNV = creEle("td");
    var tabTD_Email = creEle("td");
    var tabTD_NgayVaoLam = creEle("td");
    var tabTD_ChucVu = creEle("td");
    var tabTD_XepLoai = creEle("td");
    var tabTD_TongLuong = creEle("td");
    var tabTD_Button_Edit = creEle("td");
    var tabTD_Button_Delete = creEle("td");

    // Tạo nội dung cho cột:
    tabTD_TkNV.innerHTML = mang[i].tkNV;
    tabTD_TenNV.innerHTML = mang[i].tenNV;
    tabTD_Email.innerHTML = mang[i].email;
    tabTD_NgayVaoLam.innerHTML = mang[i].ngayVaoLam;
    tabTD_ChucVu.innerHTML = mang[i].chucVu;
    tabTD_TongLuong.innerHTML = mang[i].tongLuong;
    tabTD_XepLoai.innerHTML = mang[i].xepLoai;
    tabTD_Button_Edit.innerHTML =
      '<button onclick="suaNhanVien(' +
      mang[i].tkNV +
      ')" class="btn btn-info">Sửa</button>';
    tabTD_Button_Delete.innerHTML =
      "<button onclick=\"xoaNhanVien('" +
      mang[i].tkNV +
      '\')" class="btn btn-danger">Xóa</button>';

    // đưa cột vào dòng
    tabTR.appendChild(tabTD_TkNV);
    tabTR.appendChild(tabTD_TenNV);
    tabTR.appendChild(tabTD_Email);
    tabTR.appendChild(tabTD_NgayVaoLam);
    tabTR.appendChild(tabTD_ChucVu);
    tabTR.appendChild(tabTD_TongLuong);
    tabTR.appendChild(tabTD_XepLoai);
    tabTR.appendChild(tabTD_Button_Edit);
    tabTR.appendChild(tabTD_Button_Delete);

    // Đưa dòng vào thẻ tbody
    getEle("tableDanhSach").appendChild(tabTR);
  }
}

// hàm lưu lại mảng đã có
function setLocalStorage() {
  // chuyển kiểu json sang kiểu string (JSON.stringify)
  var arrString = JSON.stringify(dsnv.list);
  localStorage.setItem("DSNV", arrString);
}

//Show mảng đang có
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    dsnv.list = JSON.parse(data);
    // chuyển từ kiểu stringify => Json
    taoBang(dsnv.list);
  }
}
// Hàn xoá nhân viên
function xoaNhanVien(maSV) {
  dsnv._xoaNhanVien(maSV);
  taoBang(dsnv.list);
  setLocalStorage();
}

//  cập nhật nhân viên
function suaNhanVien(tkNV) {
  // tạo mảng
  var nhanVien = dsnv.layThongTinNhanVien(tkNV);

  // dom tới UI
  getEle("tknv").value = nhanVien.tkNV;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngayVaoLam;
  getEle("luongCB").value = nhanVien.luongCB;
  getEle("chucvu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;
}

getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layDuLieuDauVao(false);
  // console.log(nhanVien);
  nhanVien.xepHang();
  nhanVien.tinhLuong();

  dsnv._capNhatNhanVien(nhanVien);
  // console.log(dsnv);
  taoBang(dsnv.list);
  //lưu mảng list
  setLocalStorage();
  // console.log(dsnv.list);
});

// Nhấn nút đóng tự động clear mẫu đang điền
getEle("btnDong").addEventListener("click", function () {
  //Dom tới các thẻ input gán value lại rỗng hết
  getEle("formNV").reset();
  getEle("tknv").disabled = false;
});

// Tạo tìm kím xếp loại
getEle("searchName").addEventListener("keyup", function () {
  var keyWord = getEle("searchName").value;
  var mangTimKiem = dsnv.timKimXepLoai(keyWord);
  taoBang(mangTimKiem);
});
