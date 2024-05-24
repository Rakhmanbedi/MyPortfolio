import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSkill = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [skill, setSkill] = useState({
    photo: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    getSkill();
  }, []);

  const getSkill = () => {
    fetch(`http://127.0.0.1:8000/api/skill/` + id)
      .then((res) => res.json())
      .then((data) => {
        setSkill(data);
      });
  };

  const handleChange = (event) => {
    setSkill({ ...skill, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(skill);
    fetch(`http://127.0.0.1:8000/api/skill/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skill)
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          setSkill({
            isLoaded: true,
            error
          });
        }
      );
    event.preventDefault();
    navigate("/my_skills");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="photo"
          value={skill.photo || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={skill.title || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Short description:
        <textarea rows="5" cols="33"
          type="text"
          name="description"
          value={skill.description || ""}
          onChange={handleChange}

        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default EditSkill;

