/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'The name is required'],
  },
  surname: {
    type: String,
    //required: ['true', 'The surname is required'],
  },
  slug: {
    type: String,
  },
  email: {
    type: String,
    required: ['true', 'The email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: ['true', 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['user', 'farmer', 'admin'],
    default: 'user',
  },
  images: {
    gallery: {
      type: Array,
      default: [
        { name: 'garten', path: '' },
        { name: 'animals', path: '' },
        { name: 'products', path: '' },
      ],
    },
    profile: {
      type: String,
      default: '',
    },
    cover: {
      type: String,
      default: '',
    },
  },
  description: {
    type: String,
    default: '',
  },
  config: {
    recipes: {
      type: Boolean,
      default: 'true',
    },
    gallery: {
      type: Boolean,
      default: 'true',
    },
    products: {
      type: Boolean,
      default: 'true',
    },
    open: {
      type: Boolean,
      default: 'true',
    },
    color: {
      type: String,
      default: 'green'
    },
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
});

//this Middleware will run before save the documment
userSchema.pre('save', async function (next) {
  //1. If the password has not been modified exit the function and call the next middleware.
  if (!this.isModified('password')) return next();

  //2. Hash the password using bcrypt
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create a slug
userSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//query Middleware
//pupolate products when use find
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
    select: '-__v',
  });
  next();
});

/**
 * Decrypt the password that is saved inside the documment and compare with the given password
 * @param {str} givenPassword
 * @return true / false
 */
userSchema.methods.comparePasswords = function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
