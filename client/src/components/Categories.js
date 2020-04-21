import React, { Component } from "react";

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/categories`)
      .then((res) => res.json())
      .then((categories) =>
        this.setState({ categories }, () =>
          console.log("Categories fetched...", categories)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <ul>
          {this.state.categories.map((category) => (
            <li key={category.id}>{category.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Categories;
