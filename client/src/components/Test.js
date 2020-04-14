/* eslint-disable react/prop-types */
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

      if (lengthToSend - 4 <= 0) {
        console.log("liudeselis");
        setLoad(false);
      }
      if (lengthToSend - 4 > 0) {
        loadMore(lengthToSend - 4).catch((error) => {
          alert("loading posts failed " + error);
        });
      }
      setLength(lengthToSend - 4);
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

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadNewPosts}
        hasMore={continueLoading}
        loader={<h4>Loading...</h4>}
        endMessage={<p>this is the end my friend</p>}
      >
        <h1>Database Test</h1>
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
