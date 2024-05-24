import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    name: "",
    title: "",
    short_description: "",
    about_me: "",
    content: ""
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    fetch(`http://127.0.0.1:8000/api/post/` + id)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  };

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(post);
    fetch(`http://127.0.0.1:8000/api/post/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          setPost({
            isLoaded: true,
            error
          });
        }
      );
    event.preventDefault();
    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={post.name || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={post.title || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Short description:
        <textarea rows="5" cols="33"
          type="text"
          name="short_description"
          value={post.short_description || ""}
          onChange={handleChange}

        />
      </label>
      <label>
        About Me:
        <input
          type="text"
          name="about_me"
          value={post.about_me || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          name="content"
          value={post.content || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default EditPost;

