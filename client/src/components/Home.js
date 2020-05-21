import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import * as categoriesActions from "../redux/actions/categoriesActions";
import { bindActionCreators } from "redux";
import PostList from "./post/PostList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./misc/Spinner";
import ScrollUpButton from "react-scroll-up-button";
import useDebounce from "./misc/useDebounce";
import RecursiveDropdown from "./post/RecursiveDropdown";

function Home({
  loadMore,
  loadLength,
  searchForPosts,
  loadCategories,
  categories,
  length = 0,
  posts = [],
  foundPosts,
  clearPosts,
  categoryFilter,
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

  useEffect(() => {
    loadCategories().catch((err) => console.log(err));
  }, []);

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

  useEffect(() => {
    console.log(categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="container-wrapper">
      <div className="row">
        <div className="col-lg-8">
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
        </div>
        <div className="col-lg-4">
          {categories ? (
            <RecursiveDropdown parent="^(?![\s\S])" categories={categories} />
          ) : (
            <select className="form-control" />
          )}
        </div>
      </div>
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
    categories: state.categories.categories,
    categoryFilter: state.categories.updatedCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearPosts: bindActionCreators(postActions.clearPosts, dispatch),
    load: bindActionCreators(postActions.loadPosts, dispatch),
    loadMore: bindActionCreators(postActions.loadMorePosts, dispatch),
    loadLength: bindActionCreators(postActions.loadLength, dispatch),
    searchForPosts: bindActionCreators(postActions.searchForPosts, dispatch),
    loadCategories: bindActionCreators(
      categoriesActions.loadCategories,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
