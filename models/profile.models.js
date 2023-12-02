const { Schema, model } = require("mongoose");

const schema = new Schema({
  // id, name, surname, email, password, role, active

  name: {
    type: Schema.Types.String,
    required: true,
  },
  surname: {
    type: Schema.Types.String,
    required: false,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    required: false,
  },
  active: {
    type: Schema.Types.Boolean,
    required: false,
  },
});

module.exports = model("profile", schema);
