const Sequelize = require('sequelize');


const Conn = new Sequelize(
    'blog',
    'postgres',
    'admin', {
        host: 'localhost',
        dialect: 'postgres'
    }
);


const User = Conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  premium: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: false
});

User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User, { onDelete: 'CASCADE' });


Conn.sync();

console.log("The table for the User model was just (re)created!");

module.exports = Conn;