import React from "react";
import { Link } from "react-router-dom";

class AdmSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      skills: []
    };
  }

  delSkill(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/skill/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        });
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/skills")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            skills: result
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
    const { error, isLoaded, skills } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Posts</h1>
          <Link className="btn-add" to="/create/skill">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>description</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {skills.map(skill => (
              <tr key={skill.id}>
                <td><img src={`http://127.0.0.1:8000/storage/${skill.photo}`} alt="Skill" width={100}/></td>
                <td>{skill.title}</td>
                <td>{skill.description}</td>
                <td>{skill.created_at}</td>
                <td>
                  <Link className="btn-edit" to={{pathname: "/skill/edit/" + skill.id}}> Edit </Link>
                  &nbsp;
                  <button className="btn-delete" onClick={() => this.delSkill(skill.id)}>Delete</button>
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

export default AdmSkills;
