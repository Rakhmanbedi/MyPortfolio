import React from "react";
import { useNavigate } from "react-router-dom";

class CreateAboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      about: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "image") {
      this.setState({ image: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { image, about } = this.state;

    // Client-side validation
    if (!image || !about) {
      this.setState({ error: "Title and description are required." });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("about", about);

    fetch("http://127.0.0.1:8000/api/about/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            image: null,
            about: "",
            error: null,
          });
          this.props.navigate("/about_me");
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
          <input type="file" name="image" onChange={this.handleChange} />
        </label>
        {this.state.image && <p>Selected file: {this.state.image.name}</p>}
        <label>
          About:
          <input type="text" name="about" value={this.state.about} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateAboutMe {...props} navigate={navigate} />;
}

export default WithNavigate;
