// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    password: {
      type: String,
      trim: true,
      minlength: 8
    },
    name: {
      type: String,
      trim: true,
      maxlength: 80,
      minlength: 1,
      // required:[true, 'name is required!'],
      validate: {
        validator: function(v) {
          return /^([a-zA-Z0-9]+[,.]?[ ]?|[a-zA-Z0-9]+['-]?)+$/.test(v);
        },
        message: props => `${props.value} is not a valid first name!`
      },
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }


  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
