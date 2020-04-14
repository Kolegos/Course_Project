import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import { bindActionCreators } from "redux";
import TestList from "./TestList";
import InfiniteScroll from "react-infinite-scroll-component";

function Test({ loadMore, loadLength, length = 0, posts = [] }) {
  const [continueLoading, setLoad] = useState(true);
  const [tempLength, setLength] = useState(length);

  function loadNewPosts() {
    if (length !== 0 && posts.length !== 0) {
      let lengthToSend;
      if (tempLength === 0) {
        lengthToSend = length;
      } else lengthToSend = tempLength;

      if (lengthToSend - 10 <= 0) {
        loadMore(1).catch((error) => {
          alert("loading posts failed " + error);
        });
        console.log(lengthToSend + "bybis");
        console.log("liudeselis");
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
    <h1> Loading latest posts</h1>
  ) : (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadNewPosts}
        hasMore={continueLoading}
        loader={<h4>Loading...</h4>}
        endMessage={<h3>There are no more posts to show</h3>}
      >
        <h1 className="text-center">Check out the latests posts</h1>
        <TestList posts={posts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
