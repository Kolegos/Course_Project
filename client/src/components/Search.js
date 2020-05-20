import React, { useState, useEffect } from "react";
import useDebounce from "./misc/useDebounce";
import { connect } from "react-redux";
import { searchForPosts } from "../redux/actions/postActions";
import PostList from "./post/PostList";

const Search = ({ dispatch, foundPosts }) => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(inputText, 300);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(searchForPosts(inputText));
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
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner large">
        <input
          class="form-control"
          type="text"
          placeholder="Ko ieškosite šiandien?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></input>
        {results && results.length === 0 && inputText !== "" && !isLoading ? (
          <h4>Pagal Jūsų pateiktą užklausą rezultatų nerasta</h4>
        ) : null}
        {results ? (
          results.length !== 0 && inputText !== "" ? (
            <div>
              <PostList posts={results} />
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  let foundPosts = state.posts.postsFromSearch;
  return {
    foundPosts,
  };
}

export default connect(mapStateToProps, null)(Search);
