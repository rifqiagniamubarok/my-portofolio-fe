import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { AiFillPlusSquare, AiFillDelete, AiOutlineSend } from 'react-icons/ai';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ProjectView = ({ onSubmit }) => {
  const [formView, setFormView] = useState([{ name: '', url: '', position: 1 }]);
  const formatForm = {
    name: '',
    url: '',
    position: formView.length + 1,
  };

  const handleAddProjectView = () => {
    setFormView([...formView, formatForm]);
  };

  const handleNameChangeView = ({ target }) => {
    let newFormView = formView;
    const { name, value } = target;
    const getIndex = name.split('name-view-')[1];

    newFormView[getIndex].name = value;
    setFormView(newFormView);
  };

  const handleUrlChangeView = (index) => {
    let newFormView = formView;
    const { name, value } = target;
    const getIndex = name.split('url-view-')[1];

    newFormView[getIndex].url = value;
    setFormView(newFormView);
  };

  const handleDeleteView = (position) => {
    let newFormView = formView.filter((view) => view.position !== position);
    let getNew = newFormView.sort((a, b) => a.position - b.position);
    getNew.forEach((item, index) => {
      item.position = index + 1;
    });
    setFormView(getNew);
  };

  const handlePositionUp = (index) => {
    if (index < 1) return;
    let newFormView = formView;
    newFormView[index].position = index;
    newFormView[index - 1].position = index + 1;
    let getNew = newFormView.sort((a, b) => a.position - b.position);
  };

  const handleSubmitProjectView = () => {
    onSubmit(formView);
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-end gap-2">
        <Button variant="faded" onClick={handleAddProjectView}>
          <AiFillPlusSquare /> Add
        </Button>
        <Button variant="faded" onClick={handleSubmitProjectView}>
          <AiOutlineSend /> Submit
        </Button>
      </div>
      <div className="space-y-4">
        {formView
          // .sort(function (a, b) {
          //   return a.position - b.position;
          // })
          .map(({ name, url, position }, index) => (
            <div className="flex gap-x-2 items-center" key={index}>
              <Button isIconOnly variant="faded" disabled>
                {position}
              </Button>
              <Input label="Name" size="sm" variant="faded" name={`name-view-${index}`} onChange={handleNameChangeView} />
              <Input label="Url" size="sm" variant="faded" name={`url-view-${index}`} onChange={handleUrlChangeView} />
              <Button isIconOnly variant="faded" onClick={() => handlePositionUp(index)}>
                <FaArrowUp />
              </Button>
              <Button isIconOnly variant="faded">
                <FaArrowDown />
              </Button>
              <Button isIconOnly variant="faded" color="danger" onClick={() => handleDeleteView(position)}>
                <AiFillDelete />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectView;
