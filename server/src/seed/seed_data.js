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
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'), name: 'Swing', createdAt: new Date(), updatedAt: new Date() },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000101'), name: 'Slide', createdAt: new Date(), updatedAt: new Date() },
];

const reviewsData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000200'),
        playgroundId: new mongoose.Types.ObjectId('6742a19077300f01cf591b04'),
        userId: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        content: 'Great playground!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        playgroundId: new mongoose.Types.ObjectId('6742a19077300f01cf591b05'),
        userId: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        content: 'Nice place for kids!',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const areasData = [
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000300'), name: 'Ha Noi' },
    { _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000301'), name: 'Sai Gon' },
    {_id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000302'), name: 'Da Nang'},
];

const usersData = [
    {
        _id: new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000000'),
        email: 'example@email.com',
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
        name: 'Greenfield Playground',
        admissionFee: 50000,
        address: '123 Nguyen Trai, Ha Noi',
        area: 'Ha Noi',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'),
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000101'),
        ],
        openingTime: 21600,
        closingTime: 64800,
        description: 'A large playground with plenty of green space and modern equipment.',
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
        name: 'Sunshine Park',
        admissionFee: 30000,
        address: '456 Tran Phu, Da Nang',
        area: 'Da Nang',
        attractions: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000100'),
        ],
        openingTime: 25200,
        closingTime: 72000,
        description: 'A cozy playground with a variety of attractions for kids.',
        imageUrl: 'https://example.com/images/sunshine.jpg',
        reviews: [
            new mongoose.Types.ObjectId('648d7eb3fc13ae4d6b000201'),
        ],
        ratingAvg: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];