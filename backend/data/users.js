const bcrypt = require('bcryptjs')

const users =[
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('bhargavi', 10),
        isAdmin: true
    },
    {
        name: 'Test User',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('bhargavi', 10),
        isAdmin: false
    },
    {
        name: 'custom User',
        email: 'custom@gmail.com',
        password: bcrypt.hashSync('bhargavi', 10),
        isAdmin: false
    }
]

module.exports = users