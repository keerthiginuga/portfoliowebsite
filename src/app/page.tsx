import { HomeMotionClient } from "@/components/home/HomeMotionClient";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getSelectWorksProjects, toMotionProjects } from "@/content/projects";

export default function Home() {
  const motionProjects = toMotionProjects(getSelectWorksProjects());

  return (
    <HomeMotionClient motionProjects={motionProjects}>
      <HomePageContent motionProjects={motionProjects} />
    </HomeMotionClient>
  );
}
