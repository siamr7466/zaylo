const users = [
    {
        _id: 'user_admin',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
        isCustomer: false,
    },
    {
        _id: 'user_1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
        isCustomer: true,
    },
    {
        _id: 'user_2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
        isCustomer: true,
    },
];

module.exports = users;
