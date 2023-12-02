const { Schema, model } = require("mongoose");

const schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "profile", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "post", required: true },
  timestamp: { type: Schema.Types.Date, default: Date.now },
});

module.exports = model("like", schema);
