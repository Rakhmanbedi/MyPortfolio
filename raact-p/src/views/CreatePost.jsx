import React from "react";
import { useNavigate } from "react-router-dom";
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', title: '', short_description: '', about_me: null, content: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "about_me") {
      this.setState({ about_me: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, title, short_description, about_me, content } = this.state;

    // Client-side validation
    if (!name || !title) {
      this.setState({ error: "Title and description are required." });
      return;
    }

    const formData = new FormData();
    formData.append("about_me", about_me);
    formData.append("title", title);
    formData.append("name", name);
    formData.append("short_description", short_description);
    formData.append("content", content);

    fetch("http://127.0.0.1:8000/api/post/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            about_me: null,
            title: "",
            short_description: "",
            name: "",
            content: "",
            error: null,
          });
          this.props.navigate("/posts");
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
        <div>{error && <p style={{color: "red"}}>{error}</p>}</div>
        <label>
          Photo:
          <input type="file" name="about_me" onChange={this.handleChange}/>
        </label>
        {this.state.about_me && <p>Selected file: {this.state.about_me.name}</p>}

        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        </label>
        <label>
          Description:
          <input type="text" name="short_description" value={this.state.short_description}
                 onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
      ;
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreatePost {...props} navigate={navigate}/>
}

export default WithNavigate;
