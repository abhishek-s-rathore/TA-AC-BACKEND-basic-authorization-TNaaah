const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //   author: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  cover: {
    type: String,
    required: true,
  },
  audioTrack: {
    type: String,
    required: true,
  },
  categories: [{ type: String }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  podcastAvailability: {
    type: String,
    default: 'free',
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Podcast', podcastSchema);
