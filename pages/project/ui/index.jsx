import ProjectLayout from '@/components/Templates/ProjectLayout';
import UiCard from '@/components/molecules/UiCard';
import { Card } from '@nextui-org/react';
import React from 'react';

const ProjectUi = () => {
  return (
    <ProjectLayout>
      <div className="grid grid-cols-2 gap-4 pb-20">
        {[...Array(10)].map((_, index) => (
          <UiCard key={index} data-aos="fade-up" data-aos-duration={1600} />
        ))}
      </div>
    </ProjectLayout>
  );
};

export default ProjectUi;
