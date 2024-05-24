import React from "react";
import {Link} from "react-router-dom";
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  delPost(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/post/` + id, {
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
    fetch("http://127.0.0.1:8000/api/posts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result
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
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Posts</h1>
          <Link className="btn-add" to="/create/post">Add new</Link>

        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Short description</th>
              <th>Image</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.name}</td>
                <td>{post.title}</td>
                <td>{post.short_description}</td>
                <td><img src={post.about_me} alt="Post" width={100}/> <br/><br/></td>
                <td>{post.created_at}</td>
                <td>
                  <Link className="btn-edit" to={{pathname: "/post/edit/" + post.id}}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={() => this.delPost(post.id)}>Delete</button>
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

export default Posts;
