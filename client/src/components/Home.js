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
  length = 0,
  posts = [],
  categories,
  clearPosts,
  loadCategories,
  categoryFilter = "",
  loaded,
}) {
  const [continueLoading, setLoad] = useState(true);
  const [tempLength, setLength] = useState(length);
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(inputText, 300);

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
        loadMore(lengthToSend - 10, inputText, categoryFilter).catch(
          (error) => {
            alert("loading posts failed " + error);
          }
        );
      }
      setLength(lengthToSend - 10);
    }
  }

  function getLength() {
    if (isLoading) return;
    if (length === 0) {
      loadLength(inputText, categoryFilter).catch((error) => {
        alert("loading length failed" + error);
      });
    }
    if (posts.length === 0 && length !== 0) {
      loadMore(length, inputText, categoryFilter).catch((error) => {
        alert("loading posts failed " + error);
      });
    }
  }

  useEffect(() => {
    loadCategories().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [loaded]);

  useEffect(() => {
    getLength();
  }, [isLoading]);

  useEffect(() => {
    setLoading(true);
    clearPosts();
    setLength(0);
    loadLength(inputText, categoryFilter).catch((error) => {
      alert("loading length failed" + error);
    });
  }, [debouncedSearch, categoryFilter]);

  return (
    <div className="container-wrapper">
      <div className="row">
        <div className="col-lg-6">
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
        <div className="col-lg-6">
          {categories ? (
            <RecursiveDropdown parent="^(?![\s\S])" categories={categories} />
          ) : (
            <div className="row">
              <div className="mr-1 pr-1">
                <select className="form-control">
                  <option value="">------------</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      {posts.length === 0 && isLoading ? (
        <Spinner />
      ) : length === 0 ? (
        <h3 className="text-center m-2 p-2" style={{ color: "white" }}>
          Pagal Jūsų užklausą rezultatų nerasta
        </h3>
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
            loader={<Spinner />}
            endMessage={
              <h3 className="text-center" style={{ color: "white" }}>
                Daugiau nebėra skelbimų, kuriuos galėtume parodyti...
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
    categoryFilter:
      state.categories.updatedCategory !== "^(?![\\s\\S])"
        ? state.categories.updatedCategory
        : "",
    loaded: state.posts.loaded ? state.posts.loaded : 0,
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
