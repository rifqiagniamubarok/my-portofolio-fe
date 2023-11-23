import BasicLayout from '@/components/Templates/BasicLayout';
import ProjectLayout from '@/components/Templates/ProjectLayout';
import ProjectCard from '@/components/molecules/ProjectCard';
import { Input } from '@nextui-org/react';
import classNames from 'classnames';
import React from 'react';

const Project = () => {
  return (
    <BasicLayout>
      <section className="pt-20 space-y-4 dark min-h-screen">
        <div data-aos="fade-up" data-aos-duration="500">
          <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Projects</p>
        </div>
        <div className="dark:text-white" data-aos="fade-up" data-aos-duration="1000">
          <Input label="Search" color="primary" variant="bordered" />
        </div>
        <div className="space-y-4 pb-20 mt-10" data-aos="fade-up" data-aos-duration="1500">
          {[...Array(10)].map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
      </section>
    </BasicLayout>
  );
};

export default Project;
