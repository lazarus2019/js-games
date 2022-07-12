## Các kỹ thuật tối ưu hiệu xuất dành cho hình ảnh (FrontEnd + BackEnd + Design)

- [1] Chỉ load những hình ảnh cần thiết khi người dùng sử dụng Website
- [2] Tối ưu hình ảnh cho nhiều thiết bị với nhiều kích thước khác nhau: Mobile, Desktop
- [3] Vấn đề nên tránh trong hầu hết các trường hợp: Cumulative Layout Shift (CLS) => Chừa ra 1 khoảng không gian bằng kích thước của hình ảnh sẽ được tải
> CLS: Khi truy cập website, hình ảnh ban đầu chưa được tải về (0px), sau đó được tải về (100px) => giao diện bị đẩy xuống dưới (Đây là yếu tố giúp Search Engine của GG đánh giá website có tốt hay không)

### Browser-level: lazy-loading, srcset (phụ thuộc vào browser)
[Xem chi tiết - thuộc tính: lazy-loading, srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

#### Lazy-loading (hỗ trợ [1])
- Thuộc tính loading của image (bắt buộc bật Javascript) 
    - lazy: Thực thi tải hình khi được tính toán từ khoảng cách viewport bởi browser (có thể tự custom lại)
    - eager: Tải hình ngay lập tức, ngay cả hình không nằm trong viewport

#### srcset (hỗ trợ [2])
- Thuộc tính khai báo tập hợp nhiều tấm hình theo nhiều kích thước khác nhau => browser tải hình phù hợp

### Scroll và Resize event (cách truyền thống - thư viện cũ thường sử dụng) => có thể làm chậm website
[Xem chi tiết - tính tọa độ của element trong viewport](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

- Tự tính toán và nhận diện người dùng đang scroll ở vị trí nào, tọa độ tấm hình ở đâu (có trong viewport hay không) => load hình <> tiếp tục theo dõi quá trình duyệt web của người dùng

### Intersection Observer (cơ chế hỗ trợ chính thức của browser - chỉ có ở browser version cao)
[Xem chi tiết Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

- Giúp quan sát phần tử có nằm ở trong khung hay viewport mong muốn hay không 
- Báo cáo việc hiển thị của quảng cáo bằng cách tracking tỷ lệ bao nhiều phần quảng cáo được thấy (20%, 50%, 100%,...)