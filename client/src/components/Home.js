import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import { bindActionCreators } from "redux";
import PostList from "./post/PostList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./misc/Spinner";
import ScrollUpButton from "react-scroll-up-button";

function Home({ loadMore, loadLength, length = 0, posts = [] }) {
  const [continueLoading, setLoad] = useState(true);
  const [tempLength, setLength] = useState(length);

  function loadNewPosts() {
    if (length !== 0 && posts.length !== 0) {
      let lengthToSend;
      if (tempLength === 0) {
        lengthToSend = length;
      } else lengthToSend = tempLength;

      if (lengthToSend - 10 <= 0) {
        setLoad(false);
      }
      if (lengthToSend - 10 > 0) {
        loadMore(lengthToSend - 10).catch((error) => {
          alert("loading posts failed " + error);
        });
      }
      setLength(lengthToSend - 10);
    }
  }

  useEffect(() => {
    if (length === 0) {
      loadLength().catch((error) => {
        alert("loading length failed" + error);
      });
    }
    if (posts.length === 0 && length !== 0) {
      loadMore(length).catch((error) => {
        alert("loading posts failed " + error);
      });
    }
  });

  return posts.length === 0 ? (
    <Spinner />
  ) : (
    <div>
      <ScrollUpButton style={{ color: "white", backgroundColor: "#1c8ef9" }} />
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={posts.length}
        next={loadNewPosts}
        hasMore={continueLoading}
        loader={<h4>Loading...</h4>}
        endMessage={
          <h3 className="text-center">There are no more posts to show</h3>
        }
      >
        <PostList posts={posts} />
      </InfiniteScroll>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    length: state.posts.length,
    posts: state.posts.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: bindActionCreators(postActions.loadPosts, dispatch),
    loadMore: bindActionCreators(postActions.loadMorePosts, dispatch),
    loadLength: bindActionCreators(postActions.loadLength, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
