import { useState } from "react";
import Card from "./Card";
import { Project } from "@/constants";

type Props = {
  project: Project;
  setCardProject: React.Dispatch<React.SetStateAction<Project>>;
};

const ProjectDisplay = ({project, setCardProject}: Props) => {

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-violet-950">
      <div>
        <div>
          <Card project={project} setCardProject={setCardProject}></Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
