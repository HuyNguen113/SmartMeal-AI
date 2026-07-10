// Middleware phan quyen - Kiem tra vai tro nguoi dung
// Su dung: phanQuyen('quan_tri', 'nhan_vien')

const phanQuyen = (...danhSachVaiTro) => {
  return (req, res, next) => {
    // Kiem tra nguoi dung da xac thuc chua
    if (!req.nguoiDung) {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Bạn chưa đăng nhập.',
      });
    }

    // Kiem tra vai tro co nam trong danh sach cho phep khong
    if (!danhSachVaiTro.includes(req.nguoiDung.vaiTro)) {
      return res.status(403).json({
        thanhCong: false,
        thongBao: 'Bạn không có quyền thực hiện thao tác này.',
      });
    }

    next();
  };
};

export default phanQuyen;
