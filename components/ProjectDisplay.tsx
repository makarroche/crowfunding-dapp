import { useState } from "react";
import Card from "./Card";
import MagicButton from "./MagicButton";

type Project = {
  name?: string;
  description?: string;
  goal?: BigInteger;
  startTime?: BigInteger;
  endTime?: BigInteger;
};

type Props = {
  project: Project;
};

const ProjectDisplay = ({project}: Props) => {

  const [donationSucceded, setDonationSucceeded] = useState(false);
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-violet-950">
      <div>
        <div>
          <Card donationSucceeded={donationSucceded} project={project}></Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
