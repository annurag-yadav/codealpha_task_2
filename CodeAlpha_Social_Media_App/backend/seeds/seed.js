import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codealpha_social_media');

    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const hashed = await bcrypt.hash('123456', 10);

    const user1 = await User.create({
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: hashed,
      bio: 'Product designer and coffee enthusiast.',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    });

    const user2 = await User.create({
      name: 'Marcus Lee',
      email: 'marcus@example.com',
      password: hashed,
      bio: 'Frontend developer building cool things.',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    });

    const user3 = await User.create({
      name: 'Priya Shah',
      email: 'priya@example.com',
      password: hashed,
      bio: 'Data storyteller and mentor.',
      profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
    });

    user1.following.push(user2._id, user3._id);
    user2.following.push(user1._id);
    user3.following.push(user1._id);

    user2.followers.push(user1._id);
    user3.followers.push(user1._id);
    user1.followers.push(user2._id, user3._id);

    await user1.save();
    await user2.save();
    await user3.save();

    const post1 = await Post.create({
      author: user1._id,
      content: 'Ship small, learn fast, and keep shipping. The best products are built in public.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    });

    const post2 = await Post.create({
      author: user2._id,
      content: 'Working on a polished dashboard today. Great UI is usually invisible until it is missing.',
      image: '',
    });

    const post3 = await Post.create({
      author: user3._id,
      content: 'Writing documentation is just as important as writing code. Clear systems scale.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    });

    const comment1 = await Comment.create({
      post: post1._id,
      author: user2._id,
      text: 'Love this mindset. Consistency beats hype.',
    });

    const comment2 = await Comment.create({
      post: post2._id,
      author: user3._id,
      text: 'The attention to details in your UI is really strong.',
    });

    post1.comments.push(comment1._id);
    post2.comments.push(comment2._id);
    post1.likes.push(user2._id, user3._id);
    post2.likes.push(user1._id);
    post3.likes.push(user1._id, user2._id);

    await post1.save();
    await post2.save();
    await post3.save();

    console.log('Seed data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
