import React from "react";
class MySkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      skills: []
    };
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
    const { error, isLoaded, skills } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
           <section className="skills--section" id="Skills" >
              <div className="portfolio--container">
                <p className="section--title">My Skills</p>
                <h2 className="skills--section--heading">My Expertise</h2>
              </div>
              <div className="skills--section--container">

                {skills.map(skill => (
                  <div className="skills--section--card">
                    <div className="skills--section--img">
                      <img src={`http://127.0.0.1:8000/storage/${skill.photo}`} alt="Skill" width={100}/>
                    </div>
                    <div className="skills--section--card--content">
                    <h3 className="skills--section--title">{skill.title}</h3>
                      <p className="skills--section--description">{skill.description}</p>
                    </div>
                  </div>
                )
                )}
              </div>
            </section>



    </div>

    )
      ;
    }
  }
}

export default MySkills;

