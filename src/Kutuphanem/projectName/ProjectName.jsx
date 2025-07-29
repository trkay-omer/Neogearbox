import "./ProjectName.scss";

const ProjectName = ({ img, topTitle }) => {
  return (
    <div className="projectName">
      <img src={img} alt="" />
      <div className="container">
        <div className="bannerText">
          <div className="title">
            <h1>{topTitle}</h1>
          </div>
        </div>
      </div>

      <div className="background"></div>
    </div>
  );
};

export default ProjectName;
