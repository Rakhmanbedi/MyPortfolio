import React from "react";
import { Link } from "react-router-dom";

class AdmAboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      abouts: []
    };
  }

  delAbout(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/about/` + id, {
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
    fetch("http://127.0.0.1:8000/api/about_me")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            abouts: result
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
    const { error, isLoaded, abouts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (


      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Messages</h1>
          <Link className="btn-add" to="/create/about">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>Image</th>
              <th>About me</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {abouts.map(about => (
              <tr key={about.id}>
                <td><img src={about.image} alt="About" width={100}/></td>
                <td>{about.about}</td>
                <td>{about.created_at}</td>
                <td>
                  <Link className="btn-edit" to={{pathname: "/about/edit/" + about.id}}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={() => this.delAbout(about.id)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
      ;
    }
  }
}

export default AdmAboutMe;
