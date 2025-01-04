const mongoose = require('mongoose');
const ENV = require('../configs/index');
const Playground = require('../models/playgrounds.model');
const User = require('../models/users.model');
const Review = require('../models/reviews.model');
const Area = require('../models/areas.model');
const Attraction = require('../models/attractions.model');


mongoose
    .connect(ENV.MONGO_URI, { dbName: ENV.DB_NAME })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Playground.deleteMany({});
        await Attraction.deleteMany({});
        await Review.deleteMany({});
        await Area.deleteMany({});

        console.log('Old data deleted successfully.');

        const users = await User.insertMany(usersData);
        console.log('Users seeded successfully.');

        const playgrounds = await Playground.insertMany(playgroundData);
        console.log('Playgrounds seeded successfully.');

        const attractions = await Attraction.insertMany(attractionsData);
        console.log('Attractions seeded successfully.');

        const reviews = await Review.insertMany(reviewsData);
        console.log('Reviews seeded successfully.');

        const areas = await Area.insertMany(areasData);
        console.log('Areas seeded successfully.');

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
const games = [
    'ブランコ', '滑り台', '観覧車', 'ジェットコースター', 'メリーゴーランド', 
    'トランポリン', 'ボート', 'バンパーカー', 'ミニカー', 'アーケードゲーム', 'ウォータースライダー','バンジージャンプ', 'カートレース', 'ロッククライミング', 'ジップライン', 'スカイダイビング', 
    'パラグライダー', 'ホットエアバルーン', 'サーフィン', 'スケートボード', 'スノーボード', 
    'スキー', 'カヤック', 'カヌー', 'ラフティング', 'ダイビング', 'シュノーケリング', 
    'フィッシング', 'ハイキング', 'キャンプ', 'バードウォッチング'
];
const attractionsData = games.map((name, index) => ({
    _id: new mongoose.Types.ObjectId(`648d7eb3fc13ae4d6b0001${index.toString().padStart(2, '0')}`),
    name,
    createdAt: new Date(),
    updatedAt: new Date()
}));

console.log(attractionsData);

const reviewsData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000200'),
        playgroundId: new mongoose.Types.ObjectId('6742a19077300f01cf591b04'),
        userId: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        content: 'Khu vui chơi woohoo rộng rãi, khá sạch sẽ, mát, ko bị quá đông. Giá cuối tuần 160.000/bé',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        playgroundId: new mongoose.Types.ObjectId('6742a19077300f01cf591b05'),
        userId: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        content: '子供たちにとって素敵な場所！',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];


const areaNames = [
    'ハノイ', 'ホーチミン', 'ダナン', 'ハイフォン', 'カントー', 'ニャチャン', 'ダラット', 'フエ', 
    'ビン', 'クアンニン', 'バクニン', 'ハザン', 'カオバン', 'ライチャウ', 'ディエンビエン', 'ラオカイ', 
    'イエンバイ', 'タイグエン', 'ランソン', 'クアンビン', 'クアンチ', 'クアンガイ', 'ビンディン', 
    'フーイエン', 'カインホア', 'ニントゥアン', 'ビントゥアン', 'コンツム', 'ザライ', 'ダクラク', 
    'ダクノン', 'ラムドン', 'ビンフック', 'バクザン', 'バクカン', 'トゥエンクアン', 'フート', 'ハイズオン', 
    'フンイエン', 'ハナム', 'ナムディン', 'タイビン', 'ニンビン', 'タインホア', 'ゲアン', 'ハティン', 
    'ソンラ', 'ホアビン', 'ハイズオン', 'ビンロン', 'チャビン', 'カマウ', 'アンザン', 'キエンザン', 
    'ソクチャン', 'バクリエウ', 'ハウザン', 'ティエンザン', 'ビンフック', 'ロンアン', 'ドンナイ', 
    'ビンズオン', 'バリアブンタウ', 'タイニン', 'ビンロン', 'ドンタップ', 'ハウザン', 'ソクチャン', 
    'チャビン', 'カマウ'
];
const areasData = areaNames.map((name, index) => ({
    _id: new mongoose.Types.ObjectId(`648d7eb3fc13ae4d6b0003${index.toString().padStart(2, '0')}`),
    name
}));

console.log(areasData);


const usersData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        email: 'example@email.com',
        username: 'Thuc Uyen Le',
        password: '$2b$12$6Am9Xslzx.AqZbMzQrSP2uVOSV5Pk8NQpGVp4qPkRcvJLeE36OfiO',
        gender: 'male',
        dob: new Date('1990-05-15T00:00:00.000Z'),
        phoneNumber: '0123456789',
        avatarUrl: 'https://example.com/avatar/johndoe.png',
        role: 'user',
        isDisabled: false,
        favoritePlayground: [
            new mongoose.Types.ObjectId('6742a19077300f01cf591b04'),
            new mongoose.Types.ObjectId('6742a19077300f01cf591b05'),
        ],
        reviews: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000200'),
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        ],
    },
];



const playgroundData = [
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b04'),
        name: 'Woohoo - Kids Cafe & Playground',
        admissionFee: 160000,
        address: 'Chung cư HC Golden City, số 319 P. Hồng Tiến, Bồ Đề, Long Biên, Hà Nội',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'), // ブランコ
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000101'), // 滑り台
        ],
        openingTime: 21600, // 06:00 sáng
        closingTime: 64800, // 18:00 tối
        description: '"WOOHOO Kids Cafe & Playground là khu tổ hợp nhà hàng - cà phê - khu vui chơi dành cho bố mẹ và các bé từ 1 tuổi đến 10 tuổi. Khu tổ hợp rộng gần 500m2 được chia làm 3 khu: Khu vận động, nhà bóng - Khu cà phê ăn uống - Và đồ chơi, workshop dành cho trẻ em. Woohoo nằm dưới chân khu chung cư HC Golden City tại số 319 Hồng Tiến, Long Biên, HN (gần bệnh viện đa khoa Tâm Anh)"',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMXOS0BeD1gTjpg7KRF0DW-I-JX4t_soNuLA8OZ=s1360-w1360-h1020',
        reviews: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000200'),
        ],
        ratingAvg: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b05'),
        name: 'サンシャインパーク',
        admissionFee: 30000,
        address: '456 Tran Phu, ダナン',
        area: 'ダナン',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000102'), // 観覧車
        ],
        openingTime: 25200, // 07:00 sáng
        closingTime: 72000, // 20:00 tối
        description: '子供向けのさまざまなアトラクションがある居心地の良い遊び場。',
        imageUrl: 'https://th.bing.com/th/id/OIP.UJ0JrTdAr-HjlSU7EkJWOAHaFj?rs=1&pid=ImgDetMain',
        reviews: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        ],
        ratingAvg: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b06'),
        name: 'ベトナム軍事歴史博物館',
        admissionFee: 100000,  // Chưa xác định phí vào cửa
        address: 'Km6+500, CT03, Tây Mỗ, Nam Từ Liêm, Hà Nội, ベトナム',
        area: 'ハノイ',
        attractions: [],  // Thêm các trò chơi nếu có
        openingTime: 28800, // 08:00 sáng
        closingTime: 64800, // 18:00 tối
        description: 'Là bảo tàng quân sự, nơi trưng bày các hiện vật và thông tin về lịch sử quân đội Việt Nam.',
        imageUrl: 'https://chgroup.vn/wp-content/uploads/2022/12/318033155_593995769396759_8804012451620824163_n-1.jpg',
        reviews: [],
        ratingAvg: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b07'),
        name: 'ホアロー刑務所',
        admissionFee: 35000,  // Chưa xác định phí vào cửa
        address: '1 P. Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, ベトナム',
        area: 'ハノイ',
        attractions: [],  // Thêm các trò chơi nếu có
        openingTime: 28800, // 08:00 sáng
        closingTime: 64800, // 18:00 tối
        description: 'Một bảo tàng lịch sử về nhà tù Hỏa Lò, nơi từng giam giữ các chiến sĩ cách mạng Việt Nam và các tù nhân chiến tranh.',
        imageUrl: 'https://diadiemvietnam.vn/wp-content/uploads/2022/11/Nha-tu-Hoa-Lo.jpg',
        reviews: [],
        ratingAvg: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b08'),
        name: 'The New Playground',
        admissionFee: 150000,
        address: '26 Lý Tự Trọng, Bến Nghé, Quận 1, Hồ Chí Minh 700000',
        area: 'ホーチミン',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000103'), // ジェットコースター
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000104'), // メリーゴーランド
        ],
        openingTime: 25200, // 07:00 sáng
        closingTime: 72000, // 20:00 tối
        description: 'Khu vui chơi hiện đại với nhiều trò chơi thú vị dành cho trẻ em.',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNbjU6asJR2A8Azv579iJGC3LFnxWDNjZipE3cs=s1360-w1360-h1020',
        reviews: [],
        ratingAvg: 4.3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b09'),
        name: 'Smart Kids Playground',
        admissionFee: 50000,
        address: '6 Lê Văn Thiêm Hà Nội, Hanoi City, 100000',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000105'), // トランポリン
        ],
        openingTime: 25200, // 07:00 sáng
        closingTime: 72000, // 20:00 tối
        description: 'Khu vui chơi dành cho trẻ em với các hoạt động giáo dục và giải trí.',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPrYkzpIrXSCDAPsR6Xsms4AMGRYlaBvmKMM1Xd=w520-h350-n-k-no',
        reviews: [],
        ratingAvg: 4.1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b10'),
        name: 'MEOW PAW - Gắp Cả Thế Giới',
        admissionFee: 80000,
        address: '2 P. Cầu Gỗ, Phố cổ Hà Nội, Hoàn Kiếm, Hà Nội',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000106'), // ボート
        ],
        openingTime: 28800, // 08:00 sáng
        closingTime: 64800, // 18:00 tối
        description: 'Khu vui chơi với các trò chơi nhẹ nhàng và dễ thương cho trẻ em, đặc biệt là các bé yêu thích thú cưng.',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipO7IP9_XO11hunkyK7AQjmWiyafX9pfuw2a3PaT=s1360-w1360-h1020',
        reviews: [],
        ratingAvg: 4.4,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b11'),
        name: 'Dirt Town',
        admissionFee: 70000,
        address: '88 P. Tứ Liên, Tứ Liên, Tây Hồ, Hà Nội',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000107'), // バンパーカー
        ],
        openingTime: 28800, // 08:00 sáng
        closingTime: 72000, // 20:00 tối
        description: 'Một khu vui chơi ngoài trời với các trò chơi mạo hiểm cho trẻ em.',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMgJ5PtmeCjefAj6MrZaiPgCNARBOMtfQeXrKTi=w520-h350-n-k-no',
        reviews: [],
        ratingAvg: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b12'),
        name: 'Sân Chơi Trung Kính Hạ',
        admissionFee: 30000,
        address: '2Q7W+234, Trung Hoà, Cầu Giấy, Hà Nội',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000108'), // ミニカー
        ],
        openingTime: 25200, // 07:00 sáng
        closingTime: 72000, // 20:00 tối
        description: 'Khu vui chơi trẻ em nhỏ với các trò chơi nhẹ nhàng và an toàn.',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipP0k0FpAtHAqFaaRqWA_oEM_zjLT2v8zCYSrW45=s1360-w1360-h1020',
        reviews: [],
        ratingAvg: 4.3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('6742a19077300f01cf591b13'),
        name: 'Kidzooona Aeon Mall Long Bien',
        admissionFee: 120000,
        address: '27 Đ. Cổ Linh, Long Biên, Hà Nội',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000109'), // アーケードゲーム
        ],
        openingTime: 25200, // 07:00 sáng
        closingTime: 75600, // 21:00 tối
        description: 'Khu vui chơi giải trí đa dạng với các trò chơi trong nhà cho trẻ em.',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNO8VWo2E9W7S2rs9VzXZjFjXTpX5t9LD2gZxv1=s1360-w1360-h1020',
        reviews: [],
        ratingAvg: 4.6,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
