import React from "react";

const HomeGuest = () => {
  return (
    <div className="container-wrapper">
      <table className="adminhome">
        <thead>
          <tr>
            <td style={{ width: 280 }}>
              <div>Pavadinimas</div>
              <div>ᐁᐃ</div>
            </td>
            <td style={{ width: 300 }}>
              <div>Aprašymas</div>
              <div>ᐁᐃ</div>
            </td>
            <td style={{ width: 100 }}>
              <div>Kategorija</div>
              <div>ᐁᐃ</div>
            </td>
            <td style={{ width: 120 }}>
              <div>Kaina</div>
              <div>ᐁᐃ</div>
            </td>
            <td style={{ width: 220 }}></td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => {
            return <PostItem post={post} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const PostItem = ({ post }) => {
  return (
    <tr>
      <td className="title">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"></img>
          <span>{post.title}</span>
        </div>
      </td>
      <td className="desc">{post.description}</td>
      <td className="cat">{post.categoryObj[0].name}</td>
      <td className="price">{post.price}</td>
      <td className="buttons">
        <a href="#">Redaguoti</a>
        <a href="#">Pašalinti</a>
      </td>
    </tr>
  );
};

export default HomeGuest;

const posts = [
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
  {
    title: "Titulas",
    categoryObj: [{ name: "kategorija" }],
    description: "Skelbimo aprasymas",
    price: "10",
  },
];
