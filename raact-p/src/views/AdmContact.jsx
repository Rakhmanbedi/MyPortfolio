import React from "react";
import { Link } from "react-router-dom";

class AdmContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      messages: []
    };
  }

  delContact(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/contact/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // Optionally, you might want to update your state here to reflect the deletion
        },
        (error) => {
          console.log(error);
        });
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/contacts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            messages: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, messages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Messages</h1>

        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
              <tbody>
              {messages.map(message => (
                <tr key={message.id}>
                  <td>{message.first_name}</td>
                  <td>{message.last_name}</td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  <td>{message.created_at}</td>
                  <td>
                    &nbsp;
                    <button className="btn-delete" onClick={() => this.delContact(message.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>
      </div>
      );
    }
  }
}

export default AdmContact;
