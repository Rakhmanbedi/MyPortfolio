import React from "react";
import { useNavigate } from "react-router-dom";

class CreateSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      title: "",
      description: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "photo") {
      this.setState({ photo: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { photo, title, description } = this.state;

    // Client-side validation
    if (!title || !description) {
      this.setState({ error: "Title and description are required." });
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("title", title);
    formData.append("description", description);

    fetch("http://127.0.0.1:8000/api/skill/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            photo: null,
            title: "",
            description: "",
            error: null,
          });
          this.props.navigate("/my_skills");
        },
        (error) => {
          console.error("Error:", error);
          this.setState({ error: "An error occurred while submitting the form." });
        }
      );
  }

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        <label>
          Photo:
          <input type="file" name="photo" onChange={this.handleChange} />
        </label>
        {this.state.photo && <p>Selected file: {this.state.photo.name}</p>}
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateSkill {...props} navigate={navigate} />;
}

export default WithNavigate;
