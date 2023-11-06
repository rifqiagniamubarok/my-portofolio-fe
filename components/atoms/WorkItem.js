import React from 'react';

const WorkItem = ({ company, title, from, to = 'Present', experiences }) => {
  return (
    <div className="w-full">
      {company && <p className="text-white text-xl font-medium bg-gradient-to-r from-primary to-light-primary p-2">{company}</p>}
      <p className="text-white text-lg font-medium ">{title}</p>
      <p className="text-dark-gray text-base">
        {from} - {to}
      </p>
      <div className="text-white text-lg">
        <ul className="list-disc list-inside">
          {experiences.map((experience, index) => (
            <li key={index}>{experience}</li>
          ))}
          <li>...</li>
        </ul>
      </div>
      <div className="flex justify-end">
        <button className="text-white ">View More</button>
      </div>
    </div>
  );
};

export default WorkItem;
