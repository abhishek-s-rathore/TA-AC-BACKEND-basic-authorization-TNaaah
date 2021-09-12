var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    podcastId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Podcast',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
