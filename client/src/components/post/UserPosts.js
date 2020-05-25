import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";
import * as postActions from "../../redux/actions/postActions";
import PostList from "./PostList";

function UserPosts({ user = null, loadUserPosts, posts = null }) {
  useEffect(() => {
    loadUserPosts(user);
  }, []);

  return posts === null ? (
    <Spinner />
  ) : (
    <div>
      <form>
        <div>
          {posts.length === 0 ? (
            <div className="container" style={{ color: "white" }}>
              <h1>Jūs dar nesate įkėlęs nei vieno skelbimo</h1>
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  let id;
  if (state.sessions.user) {
    id = state.sessions.user._id;
  }
  const user = state.sessions.user;

  return {
    id,
    user,
    posts: state.posts.posts,
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadUserPosts(user) {
    dispatch(postActions.loadUserPosts(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
