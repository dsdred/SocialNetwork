const { Schema, model } = require("mongoose");

const schema = new Schema({
  user_id_from: { type: Schema.Types.ObjectId, ref: "profile", required: true },
  user_id_to: { type: Schema.Types.ObjectId, ref: "profile", required: true },
  timestamp: { type: Schema.Types.Date, default: Date.now },
  content: { type: Schema.Types.String, required: true, min: 1 },
});

module.exports = model("message", schema);
