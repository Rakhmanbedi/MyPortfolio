
import React from "react";
class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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

          {posts.map(post => (
          <section className="hero--section" id="heroSection">
            <div className="hero--section--content--box">
              <div className="hero--section--content">
                <p className="section--title">Hey, I'm {post.name}</p>
                <h1 className="hero--section--title">
                  {post.title}<br/>
                  <span className="hero--section-title--color">Developer</span>{" "}

                </h1>
                <p className="hero--section-description">
                  {post.short_description}
                  <br/>
                </p>
              </div>
              <a className="btn btn-primary" href="https://www.linkedin.com/in/rakhmanberdi-izbassar-6a5295257/">Get In Touch</a>

            </div>
            <div className="hero--section--img">
              <img className="HeroImage" src={`http://127.0.0.1:8000/storage/${post.about_me}`} alt="Post" />

            </div>
          </section>
          ))}
        </div>

      );
    }
  }
}

export default HeroSection;
