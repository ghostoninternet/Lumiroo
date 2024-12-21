const express = require('express')
const authencationMiddleware = require('../middlewares/authencation.middleware')
const roleHandler = require('../middlewares/roleHandler.middleware')
const { ROLE } = require('../constants/model')
const asyncHandler = require('../middlewares/asyncHandler.middleware')
const adminController = require('../controllers/admin.controller')
const router = express.Router()

router.use(authencationMiddleware)
router.use(roleHandler([ROLE.ADMIN]))

// Lấy toàn bộ người dùng (có phân trang)
router.get('/users', asyncHandler(adminController.getManyUsers))
// Tìm kiếm người dùng (có phân trang)
router.get('/users/search', asyncHandler(adminController.searchUsers))
// Lấy thông tin chi tiết người dùng
router.get('/users/:userId', asyncHandler(adminController.getUserDetail))
// Cập nhật quyền của người dùng
router.put('/users/:userId', asyncHandler(adminController.updateUser))
// Xóa người dùng
router.delete('/users/:userId', asyncHandler(adminController.deleteUser))

// Lấy toàn bộ sân chơi (có phân trang)
router.get('/playgrounds', asyncHandler(adminController.getManyPlaygrounds))
// Lấy thông tin chi tiết sân chơi (có phân trang)
router.get('/playgrounds/:playgroundId', asyncHandler(adminController.getPlaygroundDetail))
// Thêm một sân chơi mới
router.post('/playgrounds', asyncHandler(adminController.createNewPlayground))
// Cập nhật một sân chơi hiện có
router.put('/playgrounds/:playgroundId', asyncHandler(adminController.updatePlayground))
// Xóa sân chơi
router.delete('/playgrounds/:playgroundId', asyncHandler(adminController.deletePlayground))

// Lấy dữ liệu dành cho màn Dashboard của admin
router.get('/dashboard', asyncHandler(adminController.getDashboardData))

module.exports = router
