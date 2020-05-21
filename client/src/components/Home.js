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

  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(inputText, 300);

  useEffect(() => {
    if (debouncedSearch) {
      searchForPosts(inputText);
      setLoading(true);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setResults(foundPosts);
    setLoading(false);
  }, [foundPosts]);

  return posts.length === 0 ? (
    <Spinner />
  ) : (
    <div>
      <input
        class="form-control"
        type="text"
        placeholder="Ko ieškosite šiandien?"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>

      {results && results.length === 0 && inputText !== "" && !isLoading ? (
        <div id="container-inner" className="container">
          <h4 style={{ color: "white" }}>
            Pagal Jūsų pateiktą užklausą rezultatų nerasta
          </h4>
        </div>
      ) : null}
      {results && results.length !== 0 ? <PostList posts={results} /> : null}
      {inputText === "" ? (
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
      ) : null}
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
    load: bindActionCreators(postActions.loadPosts, dispatch),
    loadMore: bindActionCreators(postActions.loadMorePosts, dispatch),
    loadLength: bindActionCreators(postActions.loadLength, dispatch),
    searchForPosts: bindActionCreators(postActions.searchForPosts, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
