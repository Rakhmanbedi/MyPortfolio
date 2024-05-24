import React from "react";
import { Link } from "react-router-dom";

class AdmPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      portfolios: []
    };
  }

  delPort(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/portfolio/` + id, {
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
    fetch("http://127.0.0.1:8000/api/my_portfolio")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            portfolios: result
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
    const { error, isLoaded, portfolios } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (


      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>My Portfolio</h1>
          <Link className="btn-add" to="/create/portfolio">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Url name</th>
              <th>Url</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {portfolios.map(portfolio => (
              <tr key={portfolio.id}>
                <td><img src={`http://127.0.0.1:8000/storage/${portfolio.image}`} alt="Portfolio" width={100}/></td>
                <td>{portfolio.title} </td>
                <td>{portfolio.description}</td>
                <td>{portfolio.url_name}</td>
                <td>{portfolio.url}</td>
                <td>{portfolio.created_at}</td>
                <td>
                  <Link className="btn-edit" to={{pathname: "/portfolio/edit/" + portfolio.id}}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={() => this.delPort(portfolio.id)}>Delete</button>
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

export default AdmPortfolio;
