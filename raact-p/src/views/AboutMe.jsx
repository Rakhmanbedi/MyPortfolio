// export default function AboutMe() {
//   return (
//     <section id="AboutMe" className="about--section">
//       <div className="about--section--img">
//         <img src="./img/about-me.png" alt="About Me" />
//       </div>
//       <div className="hero--section--content--box about--section--box">
//         <div className="hero--section--content">
//           <p className="section--title">About</p>
//           <h1 className="skills-section--heading">About Me</h1>
//           <p className="hero--section-description">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
//             officiis sit debitis omnis harum sed veniam quasi dicta accusamus
//             recusandae? Voluptatem, reprehenderit alias? Eligendi aperiam
//             tempora numquam sint odit optio.
//           </p>
//           <p className="hero--section-description">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
//             officiis sit debitis omnis harum sed veniam quasi dicta accusamus
//             recusandae?
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
//

import React from "react";
class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      abouts: []
    };
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
    const { error, isLoaded, abouts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {abouts.map(about => (
          <section className="about--section" id="About">
            <div className="about--section--img">
              <img src={`http://127.0.0.1:8000/storage/${about.image}`} alt="About" width={100}/>
            </div>
            <div className="hero--section--content--box about--section--box">
            <div className="hero--section--content">
                <p className="section--title">About</p>
                <h1 className="skills-section--heading">About Me</h1>
                <p className="hero--section-description">
                  {about.about}
                </p>

              </div>
            </div>
          </section>
                )
                )}

        </div>

      )
        ;
    }
  }
}

export default AboutMe;

