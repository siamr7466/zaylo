const { usersDb, productsDb, ordersDb } = require('./config/jsonDb');
const users = require('./data/users');
const products = require('./data/products');
const bcrypt = require('bcryptjs');

const importData = async () => {
    try {
        // Clear existing
        usersDb.data = [];
        productsDb.data = [];
        ordersDb.data = [];

        // Create users
        const createdUsers = [];
        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const createdUser = await usersDb.create({
                ...user,
                password: hashedPassword
            });
            createdUsers.push(createdUser);
        }

        const adminUser = createdUsers[0]._id;

        // Create products
        for (const product of products) {
            await productsDb.create({
                ...product,
                user: adminUser
            });
        }

        console.log('Data Imported successfully into JSON DB!');
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
    }
};

const destroyData = async () => {
    try {
        usersDb.data = [];
        productsDb.data = [];
        ordersDb.data = [];
        usersDb.save();
        productsDb.save();
        ordersDb.save();
        console.log('Data Destroyed!');
    } catch (error) {
        console.error(`Error destroying data: ${error.message}`);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
