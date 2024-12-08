// Hàm tính toán ratings
const calculateRatings = (reviews) => {
    const ratingCounts = [0, 0, 0, 0, 0]; // Mảng đếm số lượng review cho mỗi sao (1 -> 5)
  
    // Đếm số lượng mỗi rating (1 đến 5)
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++;
      }
    });
  
    // Tổng số reviews
    const totalReviews = reviews.length;
  
    // Tạo mảng ratings với count và percentage
    const ratings = ratingCounts.map((count, index) => {
      return {
        stars: index + 1,
        count: count,
        percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
      };
    });
    return ratings;
  };

  export default calculateRatings;
 