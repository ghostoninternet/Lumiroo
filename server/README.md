# Cấu trúc thư mục server
### Các file cấu hình dự án
| Tên file           | Mô tả                                                                                                          | Được chỉnh sửa                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| .gitignore         | Chứa các file và folder mà sẽ không được quản lý bởi git                                                       | Không                                                                                |
| .env               | Chứa các biến môi trường cần thiết cho dự án chạy được. **LƯU Ý KHÔNG ĐƯỢC PHÉP PUSH FILE NÀY LÊN GITHUB!!!!** | Có                                                                                   |
| .env.example       | Template cho biến môi trường để người khác khi đọc code biết được cần những biến môi trường gì                 | Có nhưng chỉ chỉnh sửa nếu có biến môi trường mới. Nếu không thì không được phép sửa |
| package-lock.json  | Chứa các thư viện phụ của các thư viện chính                                                                   | Không                                                                                |
| package.json       | Chứa thông tin về dự án, các script chạy và các thư viện                                                       | Không                                                                                |

### Cấu trúc và các file trong folder src
- **constants** và **utils**
	- 2 folder có cùng chức năng y hệt như 2 folder **constants** và **utils** của bên `client`.
- `index.js`
	- File khởi điểm của server, được sử dụng để
		- Khai báo các middleware sẽ được sử dụng chung cho toàn bộ server
		- Kết nối tới Database
		- Khởi tạo các job nếu có
		- Khởi động server
- **routes**
	- Folder chứa các file dùng để định nghĩa các API endpoint. Sẽ được code như sau:
		- Ta lấy ví dụ một API endpoint sẽ có URL như sau: `http://localhost:8000/api/auth/sign-in`
		- URL segment `api` đã được khai báo ở file `index.js` tại dòng `app.use('/api', require('./routes'))`
		- URL segment `auth` sẽ được khai báo ở trong file `index.js` nằm trong folder **routes**
		- URL segment `sign-in` sẽ được khai báo ở trong file có cùng tên với URL segment `auth` đó là file `auth.js`.
		- File `auth.js` sẽ vừa khai báo các URL segment cuối cùng và vừa gắn từng endpoint cho **middleware** và **controller** tương ứng
- **middlewares**
	- Folder để chứa các middleware, thường được dùng để
		- Validate dữ liệu của request
		- Xác thực request
		- Hỗ trợ xử lý 1 phần dữ liệu trong request
	- Có thể tìm hiểu thêm tại: 
		- https://expressjs.com/en/guide/writing-middleware.html
		- https://expressjs.com/en/guide/using-middleware.html
- **controllers**
	- Folder chứa các file controller để nhận dữ liệu từ request, đưa đến **services** để xử lý và trả về cho client
	- Cách đặt tên controller: `tên feature`.`controller`.`js`
	- Ví dụ: `auth.controller.js`
- **services**
	- Folder chứa các file service để nhận dữ liệu từ **controllers** và xử lý các logic nghiệp vụ trong đấy. Kết quả sẽ được đưa về cho **controllers**
	- Cách đặt tên y hệt controller chỉ khác chỗ thay **controller** thành **service**
- **daos**
	- Folder chứa các file định nghĩa các hàm để thao tác với Database. Các hàm này sẽ được sử dụng nhiều ở trong các file của **service** hoặc **controller**
	- Cách đặt tên y hệt controller chỉ khác chỗ thay **controller** thành **daos**
- **models**
	- Folder chứa các file định nghĩa các schema cho từng collection trong MongoDB, và các schema sẽ được sử dụng bởi **daos**
	- Cách đặt tên y hệt controller chỉ khác chỗ thay **controller** thành **model**
- **errors**
	- Folder gồm 3 file:
		- `customError`: File chứa các lớp kế thừa từ Error để tùy chỉnh và được sử dụng ở trong nhiều nơi như service, middleware.
		- `errorCodes`: File chứa các mã code cho từng error **(KHÔNG ĐƯỢC CHỈNH SỬA)**
		- `errorMessages`: File chứa các thông báo cho từng error **(KHÔNG ĐƯỢC CHỈNH SỬA)**