'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  config: {
      email: String,
      gcmKeys: [String],
      fitDataSources: { steps: String,  onfoot: String }
  },
  preferences: {
      breaks: {frequency: {type: Number, default: 30}, duration: {type: Number, default: 5}},
      work: {
          hours: {start: {type: String, default: '09:00'}, end: {type: String, default: '17:00'}},
          days: [{type: Boolean, default: [true, true, true, true, true, false, false]}]
      },
      goals: {
          daily: {
              steps: {type: Number, default: 2000},
              onfoot: {type: Number, default: 2400},
              breaks: {type: Number, default: 8}
          }
      }
  },
    history: {
        weeks: {
            best: { steps: [Number], onfoot: [Number], breaks: [Number] },
            previous: { steps: [Number], onfoot: [Number], breaks: [Number] },
            current: { steps: [Number],  onfoot: [Number], breaks: [Number] }
        }
    }
});

module.exports = mongoose.model('User', UserSchema);
