const ProfileCard = ({ user, currentUser }) => {
  const isCurrentUser = currentUser?._id === user?._id;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <img
          src={user?.profilePicture || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User')}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
        />
        <h2 className="mt-4 text-2xl font-bold text-slate-800">{user?.name}</h2>
        <p className="text-sm text-slate-500">{user?.email}</p>
        <p className="mt-3 text-sm text-slate-600 max-w-sm">{user?.bio || 'No bio added yet.'}</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="font-bold text-slate-800">{user?.followers?.length || 0}</div>
          <div className="text-slate-500">Followers</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="font-bold text-slate-800">{user?.following?.length || 0}</div>
          <div className="text-slate-500">Following</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="font-bold text-slate-800">{user?.postsCount || 0}</div>
          <div className="text-slate-500">Posts</div>
        </div>
      </div>

      {isCurrentUser && (
        <div className="mt-5 text-center">
          <a href="/profile/edit" className="inline-block bg-sky-600 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-500">
            Edit Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
