import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import { bindActionCreators } from "redux";
import PostList from "./post/PostList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./misc/Spinner";
import ScrollUpButton from "react-scroll-up-button";
import useDebounce from "./misc/useDebounce";

function Home({
  loadMore,
  loadLength,
  searchForPosts,
  length = 0,
  posts = [],
  foundPosts,
  clearPosts,
}) {
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
        loadMore(lengthToSend - 10, inputText).catch((error) => {
          alert("loading posts failed " + error);
        });
      }
      setLength(lengthToSend - 10);
    }
  }

  function getLength() {
    if (isLoading) return;
    if (length === 0) {
      loadLength(inputText).catch((error) => {
        alert("loading length failed" + error);
      });
    }
    if (posts.length === 0 && length !== 0) {
      loadMore(length, inputText).catch((error) => {
        alert("loading posts failed " + error);
      });
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [length]);

  useEffect(() => {
    getLength();
  });

  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(inputText, 300);

  useEffect(() => {
    if (debouncedSearch) {
      setLength(0);
      loadLength(inputText).catch((error) => {
        alert("loading length failed" + error);
      });
      clearPosts();
      setLoading(true);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setResults(foundPosts);
    setLoading(false);
  }, [foundPosts]);

  return (
    <div>
      <input
        className="form-control"
        type="text"
        placeholder="Ko ieškosite šiandien?"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setLoad(true);
        }}
      ></input>
      {posts.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <ScrollUpButton
            style={{ color: "white", backgroundColor: "#004c3f" }}
          />
          <InfiniteScroll
            style={{ overflow: "none" }}
            dataLength={posts.length}
            next={loadNewPosts}
            hasMore={continueLoading}
            loader={<h4>Loading...</h4>}
            endMessage={
              <h3 className="text-center" style={{ color: "white" }}>
                There are no more posts to show
              </h3>
            }
          >
            <PostList posts={posts} />
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    length: state.posts.length,
    posts: state.posts.posts,
    foundPosts: state.posts.postsFromSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearPosts: bindActionCreators(postActions.clearPosts, dispatch),
    load: bindActionCreators(postActions.loadPosts, dispatch),
    loadMore: bindActionCreators(postActions.loadMorePosts, dispatch),
    loadLength: bindActionCreators(postActions.loadLength, dispatch),
    searchForPosts: bindActionCreators(postActions.searchForPosts, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
