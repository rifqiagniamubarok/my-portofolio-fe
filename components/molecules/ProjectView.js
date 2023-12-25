import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { AiFillPlusSquare, AiFillDelete, AiOutlineSend } from 'react-icons/ai';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ProjectView = ({ onChange }) => {
  const [formView, setFormView] = useState([{ name: '', url: '', position: 1 }]);
  const [formViewFinal, setFormViewFinal] = useState([{ name: '', url: '', position: 1 }]);
  const formatForm = {
    name: '',
    url: '',
    position: formView.length + 1,
  };

  const handleAddProjectView = () => {
    setFormView([...formView, formatForm]);
  };

  const handleNameChangeView = ({ target }) => {
    let newFormView = [...formView];
    const { name, value } = target;
    const getIndex = Number(name.split('name-')[1]);

    newFormView[getIndex] = { ...newFormView[getIndex], name: value };
    setFormView(newFormView);
  };

  const handleUrlChangeView = ({ target }) => {
    let newFormView = [...formView];
    const { name, value } = target;
    const getIndex = Number(name.split('url-')[1]);

    newFormView[getIndex] = { ...newFormView[getIndex], url: value };
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
    let newFormView = [...formView];
    newFormView[index] = { ...newFormView[index], position: index };
    newFormView[index - 1] = { ...newFormView[index - 1], position: index + 1 };
    let getNew = newFormView.sort((a, b) => a.position - b.position);
    setFormView(getNew);
  };
  const handlePositionDown = (index) => {
    if (index >= formView.length - 1) return;
    let newFormView = [...formView];
    newFormView[index] = { ...newFormView[index], position: index + 2 };
    newFormView[index + 1] = { ...newFormView[index + 1], position: index + 1 };

    let getNew = newFormView.sort((a, b) => a.position - b.position);
    setFormView(getNew);
  };

  const handleSubmitProjectView = () => {
    onSubmit(formView);
  };

  useEffect(() => {
    if (formView !== formViewFinal) {
      setFormViewFinal(formView);
      onChange(formView);
    }
  }, [formView, formViewFinal]);

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
          .map((view, index) => {
            let { name, url, position } = view;

            return (
              <div className="flex gap-x-2 items-center" key={index}>
                <Button isIconOnly variant="faded" disabled>
                  {position}
                </Button>
                <Input label="Name" size="sm" variant="faded" onChange={handleNameChangeView} value={name} name={`name-${index}`} />
                <Input label="Url" size="sm" variant="faded" name={`url-${index}`} value={url} onChange={handleUrlChangeView} />
                <Button isIconOnly variant="faded" onClick={() => handlePositionUp(index)}>
                  <FaArrowUp />
                </Button>
                <Button isIconOnly variant="faded" onClick={() => handlePositionDown(index)}>
                  <FaArrowDown />
                </Button>
                <Button isIconOnly variant="faded" color="danger" onClick={() => handleDeleteView(position)}>
                  <AiFillDelete />
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProjectView;
