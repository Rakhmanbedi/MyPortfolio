import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    fetch(`http://127.0.0.1:8000/api/portfolio/` + id)
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data.portfolio);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPortfolio({ ...portfolio, [name]: value });
  };

  const handleImageChange = (event) => {
    setPortfolio({ ...portfolio, image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", portfolio.image);
    formData.append("title", portfolio.title);
    formData.append("description", portfolio.description);
    formData.append("url_name", portfolio.url_name);
    formData.append("url", portfolio.url);

    fetch(`http://127.0.0.1:8000/api/portfolio/` + id, {
      method: "PUT",
      body: formData
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          navigate("/my_portfolio");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image:
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={portfolio.title || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Short Description:
        <textarea
          rows="5"
          cols="33"
          name="description"
          value={portfolio.description || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        URL Name:
        <input
          type="text"
          name="url_name"
          value={portfolio.url_name || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        URL:
        <input
          type="text"
          name="url"
          value={portfolio.url || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit"/>
    </form>
  );
};

export default EditPortfolio;
