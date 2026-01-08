const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by seeder logic if corrected, or I should hash here
        isAdmin: true,
        isCustomer: false,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
        isCustomer: true,
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
        isCustomer: true,
    },
];

module.exports = users;
