# Cấu trúc thư mục Client
### Các file cấu hình dự án
| Tên file           | Mô tả                                                    | Được chỉnh sửa |
| ------------------ | -------------------------------------------------------- | -------------- |
| .gitignore         | Chứa các file và folder mà sẽ không được quản lý bởi git | Không          |
| eslint.config.js   | Chứa các cấu hình cho coding convention của dự án        | Không          |
| index.html         | Chứa code HTML sẵn cho trang web                         | Không          |
| package-lock.json  | Chứa các thư viện phụ của các thư viện chính             | Không          |
| package.json       | Chứa thông tin về dự án, các script chạy và các thư viện | Không          |
| postcss.config.js  | Chứa cấu hình cho PostCSS                                | Không          |
| tailwind.config.js | Chứa cấu hình cho TailwindCSS                            | Không          |
| vite.config.js     | Chứa cấu hình cho Vite, một công cụ giúp xây dựng FE     | Không          |
### Cấu trúc và các file trong folder src
- **apis**:
	- Folder chứa các file viết các hàm gọi API để sử dụng trong các page
	- File `index.js` dùng để viết cấu hình chung cho `axios`
	- Các file khác sẽ viết các hàm gợi APIs theo nghiệp vụ và sử dụng cấu hình chung cho `axios` đã được định nghĩa ở file `index.js`
- **assets**
	- Folder chứa các file ảnh, file video, file svg
- **components**
	- Folder chứa các component được sử dụng nhiều trong các page.
	- Khi tạo một component, xem xét component đó thuộc loại gì (VD: Input, Card, Button,...) và tạo một folder với tên là loại của component đó
	- Sau đấy, trong mỗi folder sẽ viết các file jsx để định nghĩa các component thuộc loại đó
- **constants**
	- Folder chứa các file định nghĩa và khai báo các hằng
	- File `index.js` định nghĩa các hằng toàn cục. Có thể hiểu là các hằng dược sử dụng cho nhiều nơi
	- Các file khác thì thường định nghĩa các hằng dành cho một nghiệp vụ nào đấy. Ví dự như file `route.js` có thể định nghĩa hằng cho các URL dành cho Frontend. Hoặc file `playground.js` định nghĩa ra các hằng dành cho khu vui chơi
- **contexts**
	- Folder chứa các component sử dụng kĩ thuật Context API. Tìm hiểu thêm tại:
		- https://react.dev/learn/passing-data-deeply-with-context
		- https://blog.logrocket.com/react-context-api-deep-dive-examples/
- **layouts**
	- Folder chứa các file jsx tạo layout cho web
	- Với project này có 2 loại layout: **Layout của Admin** và **Layout của User**
	- Mỗi loại layout sẽ cho vào trong một folder của loại layout đó
	- Trong mỗi folder sẽ bao gồm:
		- Header
		- Tên layout (MainLayout hoặc AdminLayout)
		- Footer
- **pages**
	- Folder chứa các file jsx để tạo page cho web
	- Trong folder `pages` sẽ chứa các folder cho từng nghiệp vụ.
	- Trong mỗi folder đó sẽ có thể chứa:
		- Các file jsx để làm trang web
		- Các folder khác để chia nhỏ nghiệp vụ và trong các folder này sẽ là các file jsx dành cho trang web của nghiệp vụ đó.
	- Lấy ví dụ: `pages/Auth/SignIn/SignIn.jsx` và `pages/Auth/SignUp/SignUp.jsx`. Ở đây folder `pages` chứa nghiệp vụ liên quan đến đăng nhập đăng ký thì sẽ được gọi là `Auth`. Trong nghiệp vụ đăng nhập đăng ký thì sẽ chia thành 2 nghiệp vụ con là đănh nhập và đăng ký là `SignIn` và `SignUp`. Và trong mỗi folder này là một file jsx để làm trang web đó
- **utils**
	- Folder chứa các hàm tiện ích thường được dừng để giải quyết một task nhỏ và hay lặp lại
	- Mỗi một file trong này chỉ nên gồm 1 hàm phục vụ cho 1 mục đích duy nhất
- `App.jsx`
	- File này sẽ được dùng để định nghĩa các route và page sẽ render ứng với route đó.
- `index.css`
	- File chứa các thủ tục của TailwindCSS. Đừng có xóa nếu không sẽ không dừng được Tailwind trong toàn bộ project
- `main.jsx`
	- Khởi điểm của client. Có thể thêm môt số các Context component bao bọc lấy App.
