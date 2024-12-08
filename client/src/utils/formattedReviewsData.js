import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale'; // Import ngôn ngữ Nhật

/**
 * Hàm định dạng thời gian thành "X ngày trước", "X tuần trước"...
 * @param {Date} date - Thời gian gốc
 * @returns {string} - Thời gian đã được định dạng
 */
const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ja });
};

/**
 * Hàm format dữ liệu reviews trả về từ cơ sở dữ liệu
 * @param {Array} reviews - Mảng các review thô từ cơ sở dữ liệu
 * @returns {Array} - Mảng reviews đã được format
 */
const formatReviewData = (reviews) => {
  return reviews.map(review => {
    const user = review.userId; // Giả sử bạn sử dụng ObjectId để tham chiếu người dùng

    return {
      id: review._id, // Hoặc review.id nếu bạn sử dụng trường id trực tiếp
      userName: review.userId.username,
      avatar: review.userId.avatarUrl,
      rating: review.rating,
      timeAgo: formatTimeAgo(review.createdAt), // Hàm chuyển thời gian thành định dạng "X日前"
      content: review.content,
      helpfulCount: review.helpfulCount || 0, // Giả sử có trường helpfulCount
    };
  });
};

export default formatReviewData;
