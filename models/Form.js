const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

//forms data
const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

const Userform = mongoose.model("Userform", FormSchema);


// Password hash middleware.

FormSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
});
  
// Helper method for validating user's password.
  
FormSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
  ) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
};
  


module.exports = Userform;