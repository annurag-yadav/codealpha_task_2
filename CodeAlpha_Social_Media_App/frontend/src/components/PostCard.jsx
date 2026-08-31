import { Link } from 'react-router-dom';

const PostCard = ({ post, currentUserId, onLike, onFollow }) => {
  const isLiked = post.likes?.some((user) => user._id === currentUserId || user === currentUserId);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.profilePicture || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'User')}
            alt={post.author?.name}
            className="w-11 h-11 rounded-full object-cover border border-slate-200"
          />
          <div>
            <Link to={`/profile/${post.author?._id}`} className="font-semibold text-slate-800 hover:text-sky-600">
              {post.author?.name}
            </Link>
            <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {post.author?._id !== currentUserId && (
          <button
            onClick={() => onFollow(post.author?._id)}
            className="border border-sky-200 text-sky-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-sky-50"
          >
            Follow
          </button>
        )}
      </div>

      <Link to={`/post/${post._id}`} className="block mt-4">
        <p className="text-slate-700 whitespace-pre-line">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="mt-4 rounded-2xl w-full max-h-[420px] object-cover border border-slate-200" />
        )}
      </Link>

      <div className="mt-4 flex items-center gap-5 text-sm text-slate-600">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-2 font-medium ${isLiked ? 'text-rose-500' : 'text-slate-600 hover:text-rose-500'}`}
        >
          <span>♥</span>
          <span>{post.likes?.length || 0}</span>
        </button>
        <Link to={`/post/${post._id}`} className="flex items-center gap-2 hover:text-sky-600">
          <span>💬</span>
          <span>{post.comments?.length || 0}</span>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
