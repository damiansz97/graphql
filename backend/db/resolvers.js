const DB = require("./db");

const resolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      return await DB.models.user.findOne({where: {id: args.input.id}}).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error
      });
    },
    getUsers: async (parent, args, context, info) => {
      console.log("poczatek await - szukanie userow");
      return await DB.models.user.findAll({
        order: [
          ['id', 'ASC']
        ]
      }).then((result) => {
        console.log("srodek await - przed resultem");
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error
      })
    },
    getPost: async (parent, args, context, info) => {
      return await DB.models.post.findOne({where: {id: args.input.id}}).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    },
    getPosts: async (parent, args, context, info) => {
      return await DB.models.post.findAll({
        order: [
          ['id', 'ASC']
        ]
      }).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    }
  },
  User: {
    posts: async (parent,args, context, info) => {
      console.log("poczatek await - szukanie postow");
      return await DB.models.post.findAll({where: {userId: parent.id}}).then((result) => {
        console.log("srodek await - szukanie postow");
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    }
  },
  Post: {
    author: async (parent, args, context, info) => {
      return await DB.models.user.findOne({where: {id: parent.userId}}).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    }
  },
  Mutation: {
    addUser: async (parent, args, context, info) => {
      const {
        input: { firstName, lastName }
      } = args;
        return await DB.models.user.create({ firstName: firstName, lastName: lastName }).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    },
    updateUser: async (parent, args, context, info) => {
      const {
        input: { id, firstName, lastName }
      } = args;
      return await DB.models.user.update({ firstName: firstName, lastName: lastName }, {
        where: {
          id: id
        }
      })
      .then((result) => {
        if(result.equals([1]))
        {
          return DB.models.user.findOne({where: {id: id}});
        }
        else
          throw new Error("Failure in updating the user.");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    },
    removeUser: async (parent, args, context, info) => {
      const id = args.input.id;
      let removeUser = null;
      return await DB.models.user.findOne({
        where: {
          id: id
        }
      })
      .then((result) => {
        if(result)
        {
          removeUser = result;
          return 1;
        }
        else
          throw Error("Failure in removing the user - findOne.");
      })
      .then((result) => {
        return DB.models.user.destroy({
          where: {
            id: id
          }
        })
      })
      .then((result) => {
        if(result)
          return removeUser;
        else
          throw Error("Failure in removing the user.");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    },
    addPost: async (parent, args, context, info) => {
      const {
        input: { title, content, userId, premium }
      } = args;
      return await DB.models.post.create({
        title: title, content: content, userId: userId, premium: premium
      }).then((result) => {
        console.log(result);
        return result;
      }, (error) => {
        console.log(error);
        return error;
      });
    },
    updatePost: async (parent, args, context, info) => {
      const {
        input: { id, title, content, premium, author }
      } = args;

      return await DB.models.post.update({ title: title, content: content, premium: premium, userId: author }, {
        where: {
          id: id
        }
      })
      .then((result) => {
        if(result.equals([1]))
        {
          return DB.models.post.findOne({where: {id: id}});
        }
        else
          throw new Error("Failure in updating the post.");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    },
    removePost: async (parent, args, context, info) => {
      const id = args.input.id;
      let removePost = null;
      return await DB.models.post.findOne({
        where: {
          id: id
        }
      })
      .then((result) => {
        if(result)
        {
          removePost = result;
          return 1;
        }
        else
          throw Error("Failure in removing the post - findOne.");
      })
      .then((result) => {
        return DB.models.post.destroy({
          where: {
            id: id
          }
        })
      })
      .then((result) => {
        if(result)
          return removePost;
        else
          throw Error("Failure in removing the post.");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    }
  }
};

module.exports = resolvers;