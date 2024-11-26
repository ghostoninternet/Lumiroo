const mongoose = require('mongoose');
const ENV = require('../configs/index');
const Playground = require('../models/playgrounds.model');
const User = require('../models/users.model');
const Review = require('../models/reviews.model');
const Area = require('../models/areas.model');
const Attraction = require('../models/attractions.model');
const { fakerJA: faker, fakerJA, fakerVI } = require('@faker-js/faker');  // Thư viện Faker để sinh dữ liệu ngẫu nhiên


mongoose
    .connect(ENV.MONGO_URI, { dbName: ENV.DB_NAME })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

    const imageUrls = [
        "https://nemtv.vn/wp-content/uploads/2019/01/khu-vui-choi-ha-noi-nemtv-12.jpg",
        "https://th.bing.com/th/id/OIP.IcoK1mGL3xUjY8HVbg7u5AHaFj?w=1024&h=768&rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.UppI9mYTfZ7KT38A9MtZAgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.0hEMnaLV3-m6KTGJMCQGoQHaEK?rs=1&pid=ImgDetMain",
        "https://hk.on.cc/hk/bkn/cnt/entertainment/20240718/photo/bkn-20240718160037667-0718_00862_001_01p.jpg?20240718171118",
        "https://th.bing.com/th/id/OIP.kfr6hqURmSN3yjz0HI8zRAHaJQ?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.JR2lSF2FADRePkbi_6BVRgHaE8?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th?id=OIF.XWPtWYuImD6yXf8%2bJx9gzA&rs=1&pid=ImgDetMain",
        "https://th.bing.com/th?id=OIF.abL3e2uHhWELarrlp6zT%2fw&rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.olQJTM8B0xAe49D17Clj3AHaE5?rs=1&pid=ImgDetMain",
        "https://inhat.vn/ha-noi/wp-content/uploads/2019/08/khu-vui-choi-gia-dinh-o-ha-noi-6a.jpg",
        "https://th.bing.com/th/id/OIP.uTCXekheX1dy51gnXjNlJAHaE8?rs=1&pid=ImgDetMain",
        "https://halotravel.vn/wp-content/uploads/2020/05/hanoi_khu-vui-choi-gia-dinh-o-ha-noi-2.jpg",
        "https://inhat.vn/ha-noi/wp-content/uploads/2019/08/khu-vui-choi-gia-dinh-o-ha-noi-7a.jpg",
        "https://sayhi.vn/wp-content/uploads/2019/08/khu-vui-choi-gia-dinh-o-ha-noi-1.jpg",
        "https://halotravel.vn/wp-content/uploads/2020/05/hanoi_khu-vui-choi-gia-dinh-ha-noi-7.jpg",
        "https://sayhi.vn/wp-content/uploads/2019/08/khu-vui-choi-gia-dinh-o-ha-noi-5.jpg",
        "https://hanoiparagon.vn/wp-content/uploads/2022/12/khu-vui-choi-gia-dinh-o-ha-noi-2a.jpg",
        "https://halotravel.vn/wp-content/uploads/2020/05/khu-vui-choi-gia-dinh-o-ha-noi-4.jpg",
        "https://giavevinpearl.com/wp-content/uploads/2017/11/khu-vui-choi-gia-dinh-vinpearl-nha-trang-2.jpg",
        "https://aeon.vn/wp-content/uploads/2023/01/Timezone.png",
        "https://giavevinpearl.com/wp-content/uploads/2017/11/khu-vui-choi-gia-dinh-vinpearl-nha-trang-3.jpg",
        "https://statics.vinpearl.com/du-lich-gia-dinh-gan-ha-noi-1_1625324654_1680098771.jpg",
        "https://hws.edu.vn/ckfinder/userfiles/images/10_Loi_ich_cua_tro_choi_gia_dinh_vui_va_thu_gian.jpg",
        "https://th.bing.com/th/id/R.10308daf3d8ede30ea2cd78289ca75d8?rik=QVYCK5pVhEVYmg&riu=http%3a%2f%2fmekongsport.com%2fuploads%2f2023%2f05%2fgoi-y-lap-dat-khu-vui-choi-tre-em-ngoai-troi-cho-cac-du-an-cong-bat-dong-san-san-gia-dinh.jpg&ehk=82RKTQ%2fbMboEBMAwEJ06EutPoqPcwrZVsgt9MlDGahQ%3d&risl=&pid=ImgRaw&r=0",
        "https://cdn.tgdd.vn/News/Thumb/0/khu-vui-choi-tre-em--tphcm--1--1200x628.jpg",
        "https://khuvuichoi.com/wp-content/uploads/2023/07/Giggle-Beans-1-848x530.jpg",
        "https://gonatour.vn/vnt_upload/news/09_2020/khu_vui_choi_dai_nam.jpg",
        "https://tinviettravel.com.vn/uploads/cam-nang-du-lich/2024_11/khu-vui-choi-samworld-4.jpg",
        "https://tourvinpearllandnamhoian.com/uploads/images/images/Khung-gio-mo-cua-cac-hoat-dong-tai-vinpearl-cgm.jpg",
        "https://th.bing.com/th/id/R.509d09ad3740afe1e395253b12425638?rik=a7cJZo97JCAKuQ&riu=http%3a%2f%2fwww.kameyama-sunshinepark.com%2fwp%2fwp-content%2fuploads%2f2021%2f08%2fDSCN6556.jpg&ehk=4tyWS%2bcGPFOVTeoHbiOQRQr5NUXJeaqZ1ABDPdHVx1M%3d&risl=&pid=ImgRaw&r=0"
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
    
    const games = [
        'ブランコ', '滑り台', '観覧車', 'ジェットコースター', 'メリーゴーランド', 
        'トランポリン', 'ボート', 'バンパーカー', 'ミニカー', 'アーケードゲーム', 
        'ウォータースライダー', 'バンジージャンプ', 'カートレース', 'ロッククライミング', 
        'ジップライン', 'スカイダイビング', 'パラグライダー', 'ホットエアバルーン', 
        'サーフィン', 'スケートボード', 'スノーボード', 'スキー', 'カヤック', 'カヌー', 
        'ラフティング', 'ダイビング', 'シュノーケリング', 'フィッシング', 'ハイキング', 
        'キャンプ', 'バードウォッチング'
    ];
    
    const admissionFee = [
      10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 
      60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 
      110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 
      155000, 160000, 165000, 170000, 175000, 180000, 185000, 190000, 195000, 
      200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 
      245000, 250000, 255000, 260000, 265000, 270000, 275000, 280000, 285000, 
      290000, 295000, 300000, 305000, 310000, 315000, 320000, 325000, 330000, 
      335000, 340000, 345000, 350000, 355000, 360000, 365000, 370000, 375000, 
      380000, 385000, 390000, 395000, 400000, 405000, 410000, 415000, 420000, 
      425000, 430000, 435000, 440000, 445000, 450000, 455000, 460000, 465000, 
      470000, 475000, 480000, 485000, 490000, 495000, 500000
    ];
    
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
const attractionsData = games.map((name, index) => ({
    _id: new mongoose.Types.ObjectId(`648d7eb3fc13ae4d6b0001${index.toString().padStart(2, '0')}`),
    name,
    createdAt: new Date(),
    updatedAt: new Date()
}));


// Hàm sinh dữ liệu ngẫu nhiên
function generateData(numRecords = 1000) {
    const data = [];

    for (let i = 0; i < numRecords; i++) {
        const name = fakerJA.company.name() // Tạo tên địa điểm ngẫu nhiên
        const admission = admissionFee[Math.floor(Math.random() * admissionFee.length)]; // Lấy ngẫu nhiên mức phí
        const area = areaNames[Math.floor(Math.random() * areaNames.length)]; // Lấy ngẫu nhiên khu vực
        const attractions = games
        .slice(0, Math.floor(Math.random() * games.length))
        .map(game => {
            const attraction = attractionsData.find(attr => attr.name === game);
            return attraction ? attraction._id : null;
        })
        .filter(id => id !== null); // Chọn ngẫu nhiên các trò chơi và chuyển thành ObjectId
        const openingTime = 28800; // 08:00 sáng (giờ Unix)
        const closingTime = 64800; // 18:00 tối (giờ Unix)
        const description = fakerJA.lorem.sentence()// Tạo mô tả ngẫu nhiên cho địa điểm
        const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]; // Chọn hình ảnh ngẫu nhiên từ mảng
        const reviews = []; // Mảng đánh giá có thể để trống hoặc thêm ngẫu nhiên sau

        const record = {
            _id: new mongoose.Types.ObjectId(),
            name: name,
            admissionFee: admission,
            address: `${fakerVI.location.streetAddress()}, ${area}, ベトナム`,
            area: area,
            attractions: attractions,
            openingTime: openingTime,
            closingTime: closingTime,
            description: description,
            imageUrl: imageUrl,
            reviews: reviews,
            ratingAvg: parseFloat((Math.random() * 5).toFixed(1)), // Đánh giá trung bình ngẫu nhiên từ 0 đến 5
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        data.push(record);
    }

    return data;
}

// Tạo 1000 bản ghi dữ liệu
const generatedData = generateData(1000);

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

const areasData = areaNames.map((name, index) => ({
    _id: new mongoose.Types.ObjectId(`648d7eb3fc13ae4d6b0003${index.toString().padStart(2, '0')}`),
    name
}));
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
const playgroundData = generatedData;


seedDatabase();
