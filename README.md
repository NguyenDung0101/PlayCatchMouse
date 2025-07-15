# 🐾 Virtual Cat Pet - Nuôi Mèo Ảo & Giải Trí

Một website mini thú vị nơi người dùng có thể nuôi mèo ảo, tương tác, mua đồ chơi, và chơi các mini-game để kiếm coin. Dự án hướng đến việc tạo ra một nền tảng giải trí nhẹ nhàng, vui nhộn và có yếu tố tương tác cao giữa người dùng và thú cưng ảo.

---

## 🧩 Chức năng chính

- Đăng ký / Đăng nhập người dùng
- Nhận nuôi mèo ảo (một hoặc nhiều con)
- Mèo có các trạng thái cảm xúc và thể chất
- Cho mèo ăn, chơi, tắm, nghỉ
- Mua và sử dụng vật phẩm (đồ ăn, đồ chơi,...)
- Chơi game để kiếm coin
- Quản lý thú cưng và vật phẩm
- Lịch sử hành động và trò chơi

---

## 🗂️ Phân tích model & chức năng

### 1. `User`
**Mô tả:** Đại diện cho người chơi  
**Chức năng:**
- Đăng ký, đăng nhập
- Sở hữu mèo và vật phẩm
- Chơi game và kiếm coin
- Quản lý hồ sơ cá nhân

### 2. `Cat`
**Mô tả:** Mèo ảo của người dùng  
**Chức năng:**
- Có tên, giống loài, trạng thái (đói, vui, mệt,...)
- Cập nhật trạng thái theo hành động người dùng
- Giao diện tương tác với mèo

### 3. `Item`
**Mô tả:** Vật phẩm có thể mua và sử dụng  
**Chức năng:**
- Gồm đồ ăn, đồ chơi, đồ nội thất
- Có tác động đến trạng thái mèo
- Được hiển thị trong cửa hàng

### 4. `UserItem`
**Mô tả:** Vật phẩm mà người dùng đã mua  
**Chức năng:**
- Quản lý số lượng từng vật phẩm
- Cho phép người dùng sử dụng lên mèo

### 5. `GameHistory`
**Mô tả:** Lịch sử chơi mini game  
**Chức năng:**
- Ghi lại loại game, điểm số, thời gian chơi
- Tính thưởng coin
- Dùng cho thống kê và bảng xếp hạng

### 6. `ActionLog`
**Mô tả:** Nhật ký các hành động của người dùng  
**Chức năng:**
- Lưu các hành động như: cho ăn, chơi, mua đồ,...
- Hiển thị dưới dạng timeline hoặc phân tích hành vi

## 🕹️ Mini Game gợi ý

| Tên Game        | Mô tả                             | Phần thưởng |
|----------------|-----------------------------------|-------------|
| Bắt Chuột       | Click nhanh để bắt chuột chạy vòng | Coin        |
| Leo Cây         | Bấm đúng lúc để nhảy qua cành cây | Coin        |
| Gãi Trụ         | Giữ chuột để gãi lâu nhất có thể  | Coin        |

---

## 🔮 Hướng phát triển tương lai

- Tăng cấp cho mèo, mở khóa kỹ năng
- Sự kiện hàng ngày / theo mùa
- Giao tiếp giữa người dùng (gửi quà, thăm mèo nhau)
- Bảng xếp hạng game
- Ứng dụng PWA hoặc mobile React Native
