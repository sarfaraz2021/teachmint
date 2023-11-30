const UserCard = ({ user,postCount }) => {
    return (
      <div className="card cardStyle">
        <div className="card-body">
          {/* <h5 className="card-title">{user.name}</h5> */}
          <div className="d-flex justify-content-between">
          <div className="card-text text-left">Name: {user}</div>
          <div className="card-text text-right pb-1">Posts: {postCount}</div></div>
        </div>
      </div>
    );
  }
  export default UserCard