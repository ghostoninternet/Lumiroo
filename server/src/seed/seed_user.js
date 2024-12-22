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

const seedUser = async () => {
    try {
    await User.deleteMany({});

    const users = 
    JSON.parse(`[
        {
    "_id": "676797b964ab131cfea20c24",
    "username": "Dương Giới",
    "email": "example@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348370",
    "dob": "2003-02-21T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "admin",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c25",
    "username": "Nguyễn Văn An",
    "email": "exampleaa@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348371",
    "dob": "2001-05-15T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983971_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c26",
    "username": "User 01",
    "email": "example1@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348301",
    "dob": "2002-02-02T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983971_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c27",
    "username": "User 02",
    "email": "example2@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348302",
    "dob": "2003-03-03T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983972_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c28",
    "username": "User 03",
    "email": "example3@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348303",
    "dob": "2004-04-04T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983973_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c29",
    "username": "User 04",
    "email": "example4@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348304",
    "dob": "2005-05-05T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983974_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c30",
    "username": "User 05",
    "email": "example5@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348305",
    "dob": "2006-06-06T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983975_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "admin",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c31",
    "username": "User 06",
    "email": "example6@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348306",
    "dob": "2007-07-07T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983976_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c32",
    "username": "User 07",
    "email": "example7@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348307",
    "dob": "2008-08-08T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983977_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c33",
    "username": "User 08",
    "email": "example8@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348308",
    "dob": "2009-09-09T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983978_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c34",
    "username": "User 09",
    "email": "example9@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348309",
    "dob": "2010-10-10T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983979_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c35",
    "username": "User 10",
    "email": "example10@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348310",
    "dob": "2001-11-11T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983980_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "admin",
    "isDisabled": true,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c36",
    "username": "User 11",
    "email": "example11@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348311",
    "dob": "2002-12-12T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983981_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c37",
    "username": "User 12",
    "email": "example12@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348312",
    "dob": "2003-01-13T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983982_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c38",
    "username": "User 13",
    "email": "example13@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348313",
    "dob": "2004-02-14T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983983_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c39",
    "username": "User 14",
    "email": "example14@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348314",
    "dob": "2005-03-15T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983984_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c40",
    "username": "User 15",
    "email": "example15@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348315",
    "dob": "2006-04-16T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983985_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "admin",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c41",
    "username": "User 16",
    "email": "example16@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348316",
    "dob": "2007-05-17T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983986_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c42",
    "username": "User 17",
    "email": "example17@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348317",
    "dob": "2008-06-18T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983987_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c43",
    "username": "User 18",
    "email": "example18@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348318",
    "dob": "2009-07-19T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983988_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c44",
    "username": "User 19",
    "email": "example19@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "female",
    "phoneNumber": "0374348319",
    "dob": "2010-08-20T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983989_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "user",
    "isDisabled": false,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  },
  {
    "_id": "676797b964ab131cfea20c45",
    "username": "User 20",
    "email": "example20@email.com",
    "password": "$2b$10$GGYZ.qF5T8mwyj6.xl42IONfNw/ylkOwDioz/z8kuDOOGcTMOh4q.",
    "gender": "male",
    "phoneNumber": "0374348320",
    "dob": "2001-09-21T00:00:00.000Z",
    "avatarUrl": "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983990_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    "role": "admin",
    "isDisabled": true,
    "favoritePlayground": [],
    "reviews": [],
    "createdAt": "2024-12-22T04:38:17.504Z",
    "updatedAt": "2024-12-22T04:38:17.504Z",
    "__v": 0
  }
]


      `);

    await User.insertMany(users);
    console.log('Seeded users');
    console.log('Database seeded successfully.');
} catch (error) {
    console.error('Error seeding database:', error);
} finally {
    mongoose.connection.close();
}
    }
seedUser();



