import axiosInstance from '@/utils/axiosInstance';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const TagInput = ({ variant = 'bordered', onChange }) => {
  const [tags, setTags] = useState([]);
  const [tagSelect, setTagSelect] = useState(null);

  const fetchData = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await axiosInstance.get('/tag');

      setTags(data);
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleValueChange = (value) => {
    const tag = tags.find(({ id }) => Number(value) === id);
    onChange && onChange(tag);
    setTagSelect(value);
  };

  return (
    <Autocomplete label="Select Tag" variant={variant} selectedKey={tagSelect} onSelectionChange={handleValueChange}>
      {tags.map((tag) => (
        <AutocompleteItem key={tag.id} value={tag.id} className="text-black dark:text-white">
          {tag.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default TagInput;
