import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

const buildPostResponse = async (post) => {
  await post.populate('author', 'name email profilePicture');
  await post.populate({
    path: 'comments',
    populate: { path: 'author', select: 'name profilePicture' },
  });
  await post.populate('likes', 'name profilePicture');

  return post;
};

export const getFeedPosts = async (req, res) => {
  try {
    let posts;

    if (req.user) {
      const currentUser = await User.findById(req.user._id).populate('following');
      const followedIds = currentUser.following.map((user) => user._id);
      followedIds.push(currentUser._id);

      posts = await Post.find({ author: { $in: followedIds } })
        .sort({ createdAt: -1 })
        .populate('author', 'name email profilePicture')
        .populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } })
        .populate('likes', 'name profilePicture');
    } else {
      posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture').populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } }).populate('likes', 'name profilePicture');
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email profilePicture')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } })
      .populate('likes', 'name profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch post' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const post = await Post.create({
      author: req.user._id,
      content,
      image: image || '',
    });

    const populatedPost = await buildPostResponse(post);
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Post creation failed' });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name email profilePicture')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } })
      .populate('likes', 'name profilePicture');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch user posts' });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const hasLiked = post.likes.includes(req.user._id);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name email profilePicture')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } })
      .populate('likes', 'name profilePicture');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Like action failed' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to delete this post' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Post deletion failed' });
  }
};
