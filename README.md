# Lumiroo
ITSS Nihongo 1

# Hướng dẫn chạy project local
### Yêu cầu:
- NodeJS phiên bản 20 trở lên
### Cách chạy Frontend:
- Di chuyển vào trong thư mục **client**
- Chạy lệnh `npm install`
- Sau khi đã hoàn thành tải các thư viện cần thiết, chạy lệnh `npm run dev`
### Cách chạy Backend:
- Di chuyển vào trong thư mục **server**
- Chạy lệnh `npm install`
- Sau khi đã hoàn thành tải các thư viện cần thiết, chạy lệnh `npm run dev`

# Cách commit và tạo Pull Request
- Bước 1: Checkout ra một nhánh mới
- Bước 2: Pull code từ `master` về
- Bước 3: Code
- Bước 4: Commit trên local
- Bước 5: Tiếp tục pull code từ `master` về và giải quyết conflict nếu có
- Bước 6: Push nhánh mới lên Github
- Bước 7: Tạo pull request
- Bước 8: Merge 
- Bước 9: Xóa branch trên Github

# Cách đặt tên branch
| Tên branch                          | Mô tả                                                                                                                                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| feature/tên-feauture                | Khi làm một chức năng mới, tạo một branch có cấu trức như sau: `feature/` + `tên feature`. Lưu ý là trong tên feature, các từ sẽ cách nhau bởi dấu gạch nối `-`                                                                                              |
| refactor/hoạt-động-với-refactor-này | Khi không chỉ sửa logic mà chỉ chỉnh sửa tên biến, tên hàm, vị trí biến, vị trí hàm, tên file, tên folder, vị trí file, vị trí folder thì tạo một branch có cấu trúc như sau: `refactor/` + `hoạt-động-với-refactor-này`. Ví dụ: refactor/rename-file-models |
| fix/tên-bug                         | Khi cần fix bug thì tạo một branch có cấu trúc như sau: `fix/` + `tên bug`. Ví dụ: fix/access-token-is-undefined                                                                                                                                             |
