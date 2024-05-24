import React from "react";
import { useNavigate } from "react-router-dom";

class ContactMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      number: "",
      message: "",
      error: null,
      success: null,  // Add success state
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { first_name, last_name, email, number, message } = this.state;

    // Client-side validation
    if (!first_name || !last_name || !email || !number || !message) {
      this.setState({ error: "All fields are required." });
      return;
    }

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("message", message);

    // Fetch the CSRF token from the meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch("http://127.0.0.1:8000/api/contact/", {
      method: "POST",
      body: formData,
      headers: {
        'X-CSRF-TOKEN': csrfToken
      }
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            first_name: "",
            last_name: "",
            email: "",
            number: "",
            message: "",
            error: null,
            success: "Message sent successfully!", // Set success message
          });
          this.props.navigate("/");
        },
        (error) => {
          console.error("Error:", error);
          this.setState({ error: "An error occurred while submitting the form." });
        }
      );
  }

  render() {
    const { error, success } = this.state;

    return (
      <section id="Contact" className="contact--section">
        <div>

          <h2>Contact Me</h2>
          <p className="text-lg">

          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <label htmlFor="first-name" className="contact--label">
              <span className="text-md">First Name</span>
              <input
                type="text"
                className="contact--input text-md"
                name="first_name"
                id="first-name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="last-name" className="contact--label">
              <span className="text-md">Last Name</span>
              <input
                type="text"
                className="contact--input text-md"
                name="last_name"
                id="last-name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="email" className="contact--label">
              <span className="text-md">Email</span>
              <input
                type="email"
                className="contact--input text-md"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="phone-number" className="contact--label">
              <span className="text-md">Phone Number</span>
              <input
                type="number"
                className="contact--input text-md"
                name="number"
                id="phone-number"
                value={this.state.number}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <label htmlFor="choose-topic" className="contact--label">
            <span className="text-md">Choose a topic</span>
            <select id="choose-topic" className="contact--input text-md">
              <option>Select One...</option>
              <option>Item 1</option>
              <option>Item 2</option>
              <option>Item 3</option>
            </select>
          </label>
          <label htmlFor="message" className="contact--label">
            <span className="text-md">Message</span>
            <textarea
              className="contact--input text-md"
              id="message"
              rows="8"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="Type your message..."
            />
          </label>
          <label htmlFor="checkbox" className="checkbox--label">
            <input type="checkbox" required name="checkbox" id="checkbox" />
            <span className="text-sm">I accept the terms</span>
          </label>
          <div>
            <button type="submit" value="Submit" className="btn btn-primary contact--form--btn">Submit</button>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>} {/* Display success message */}
        </form>
      </section>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <ContactMe {...props} navigate={navigate} />;
}

export default WithNavigate;
