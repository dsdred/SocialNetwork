const { Schema, model } = require("mongoose");

const schema = new Schema({
  content: { type: Schema.Types.String, required: true, min: 1, max: 1024 },
  user_id: { type: Schema.Types.ObjectId, ref: "profile", required: true },
  timestamp: { type: Schema.Types.Date, default: Date.now },
});

module.exports = model("post", schema);
