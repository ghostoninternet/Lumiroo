const mongoose = require('mongoose');
const ENV = require('../configs/index');
const Playground = require('../models/playgrounds.model');
const User = require('../models/users.model');
const Review = require('../models/reviews.model');
const Area = require('../models/areas.model');
const Attraction = require('../models/attractions.model');


mongoose
    .connect(ENV.MONGO_URI, { dbName: ENV.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
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
const attractionsData = [
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'), name: 'ブランコ', createdAt: new Date(), updatedAt: new Date() },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000101'), name: '滑り台', createdAt: new Date(), updatedAt: new Date() },
];

const reviewsData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000200'),
        playgroundId: new mongoose.Types.ObjectId('6742a19077300f01cf591b04'),
        userId: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        content: '素晴らしい遊び場！',
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

const areasData = [
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000300'), name: 'ハノイ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000301'), name: 'ホーチミン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000302'), name: 'ダナン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000303'), name: 'ハイフォン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000304'), name: 'カントー' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000305'), name: 'ニャチャン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000306'), name: 'ダラット' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000307'), name: 'フエ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000308'), name: 'ビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000309'), name: 'クアンニン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000310'), name: 'バクニン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000311'), name: 'ハザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000312'), name: 'カオバン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000313'), name: 'ライチャウ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000314'), name: 'ディエンビエン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000315'), name: 'ラオカイ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000316'), name: 'イエンバイ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000317'), name: 'タイグエン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000318'), name: 'ランソン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000319'), name: 'クアンビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000320'), name: 'クアンチ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000321'), name: 'クアンガイ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000322'), name: 'ビンディン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000323'), name: 'フーイエン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000324'), name: 'カインホア' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000325'), name: 'ニントゥアン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000326'), name: 'ビントゥアン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000327'), name: 'コンツム' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000328'), name: 'ザライ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000329'), name: 'ダクラク' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000330'), name: 'ダクノン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000331'), name: 'ラムドン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000332'), name: 'ビンフック' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000333'), name: 'バクザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000334'), name: 'バクカン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000335'), name: 'トゥエンクアン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000336'), name: 'フート' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000337'), name: 'ハイズオン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000338'), name: 'フンイエン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000339'), name: 'ハナム' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000340'), name: 'ナムディン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000341'), name: 'タイビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000342'), name: 'ニンビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000343'), name: 'タインホア' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000344'), name: 'ゲアン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000345'), name: 'ハティン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000346'), name: 'ソンラ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000347'), name: 'ホアビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000348'), name: 'ハイズオン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000349'), name: 'ビンロン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000350'), name: 'チャビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000351'), name: 'カマウ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000352'), name: 'アンザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000353'), name: 'キエンザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000354'), name: 'ソクチャン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000355'), name: 'バクリエウ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000356'), name: 'ハウザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000357'), name: 'ティエンザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000358'), name: 'ビンフック' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000359'), name: 'ロンアン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000360'), name: 'ドンナイ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000361'), name: 'ビンズオン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000362'), name: 'バリアブンタウ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000363'), name: 'タイニン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000364'), name: 'ビンロン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000365'), name: 'ドンタップ' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000366'), name: 'ハウザン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000367'), name: 'ソクチャン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000368'), name: 'チャビン' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000369'), name: 'カマウ' },
];

const usersData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        email: 'example@email.com',
        username: 'example@email.com',
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
        name: 'グリーンフィールド遊び場',
        admissionFee: 50000,
        address: '123 Nguyen Trai, ハノイ',
        area: 'ハノイ',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'),
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000101'),
        ],
        openingTime: 21600,
        closingTime: 64800,
        description: '広い緑地と最新の設備を備えた大きな遊び場。',
        imageUrl: 'https://example.com/images/greenfield.jpg',
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
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'),
        ],
        openingTime: 25200,
        closingTime: 72000,
        description: '子供向けのさまざまなアトラクションがある居心地の良い遊び場。',
        imageUrl: 'https://example.com/images/sunshine.jpg',
        reviews: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        ],
        ratingAvg: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
