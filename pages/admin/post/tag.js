import PostLayout from '@/components/Templates/PostLayout';
import axiosInstance from '@/utils/axiosInstance';

import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { AiFillAlert, AiFillDelete, AiFillEdit, AiFillFileAdd, AiOutlineLoading3Quarters } from 'react-icons/ai';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

const Tag = ({ tags: data }) => {
  const { isOpen: isOpenForm, onOpen: onOpenForm, onOpenChange: onOpenChangeForm, onClose: onCloseForm } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete, onClose: onCloseDelete } = useDisclosure();

  const [tags, setTags] = useState(data);
  const [tagSelect, setTagSelect] = useState(null);

  const [formAdd, setFormAdd] = useState({
    name: '',
    about: '',
  });

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = (tag) => {
    if (!isOpenForm) {
      const { name, about, id } = tag;
      setFormAdd({ name, about });
      setTagSelect(id);
      onOpenForm();
    } else {
      onCloseForm();
      setTagSelect(null);
      setTagSelect({
        name: '',
        about: '',
      });
    }
  };

  const toggleDelete = (id) => {
    if (!isOpenDelete) {
      setTagSelect(id);
      onOpenDelete();
    } else {
      onCloseDelete();
      setTagSelect(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tag/${tagSelect}`);
      await fetchTags();
    } catch (error) {
      console.error({ error });
    } finally {
      onCloseDelete();
      setTagSelect(null);
    }
  };

  const handleSearch = ({ target }) => {
    const { value } = target;
    setIsLoading(true);
    setSearch(value);
    debouncedSearch(value);
  };

  const fetchTags = async (search) => {
    try {
      setIsLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await axiosInstance.get('/tag', { params: { search } });
      setTags(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/tag', formAdd);
      await fetchTags();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onCloseForm();
      setTagSelect(null);
      setTagSelect({ name: '', about: '' });
    }
  };

  const handleEditTag = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/tag/${tagSelect}`, formAdd);
      await fetchTags();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onCloseForm();
      setTagSelect(null);
      setTagSelect({ name: '', about: '' });
    }
  };

  const debouncedSearch = debounce(async (searchTerm) => {
    fetchTags(searchTerm);
  }, 1000);

  return (
    <PostLayout>
      <Modal isOpen={isOpenForm} onOpenChange={onOpenChangeForm}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Tag</ModalHeader>
              <ModalBody className="text-black dark:text-white">
                <div className="space-y-4">
                  <Input type="text" label="Name" variant="bordered" value={formAdd.name} onChange={({ target: { value } }) => setFormAdd({ ...formAdd, name: value })} />
                  <Input type="text" label="About" variant="bordered" value={formAdd.about} onChange={({ target: { value } }) => setFormAdd({ ...formAdd, about: value })} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={toggleEdit}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (tagSelect) handleEditTag();
                    else handleAddTag();
                  }}
                >
                  {tagSelect ? 'Edit' : 'Add'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Tag</ModalHeader>
              <ModalBody>
                <div className="space-y-4">Are u sure want to delete this tag ?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Card className="p-4 space-y-4">
        <div className="flex gap-x-2">
          <Input
            type="text"
            label="Search"
            variant="bordered"
            className="max-w-xs"
            size="sm"
            value={search}
            onChange={handleSearch}
            endContent={<AiOutlineLoading3Quarters className={classNames(isLoading ? 'animate-spin' : 'hidden')} />}
          />
          <Tooltip content="Create new tag" color="foreground">
            <Button isIconOnly variant="bordered" color="success" size="lg" onPress={onOpenForm}>
              <AiFillFileAdd />
            </Button>
          </Tooltip>
        </div>
        <div>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>No</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn className="hidden md:flex items-center">ABOUT</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading}>
              {tags.map((tag, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{tag.name}</TableCell>
                  <TableCell className="hidden md:inline-block">{tag.about || '-'}</TableCell>
                  <TableCell className="space-x-2">
                    <Button isIconOnly variant="faded" color="warning" onClick={() => toggleEdit(tag)}>
                      <AiFillEdit />
                    </Button>
                    <Button isIconOnly variant="faded" color="danger" onClick={() => toggleDelete(tag.id)}>
                      <AiFillDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </PostLayout>
  );
};

export async function getServerSideProps(context) {
  const cookie = parse(context.req.headers.cookie || '');
  const isToken = cookie.token || false;

  if (!isToken)
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login',
      },
    };

  try {
    const {
      data: {
        data: { data },
      },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/tag`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });
    // const { data } = await axiosInstance.get('/tag');

    const tags = data;
    return {
      props: { tags },
    };
  } catch (error) {
    return {
      props: { tags: [] },
    };
  }
}

export default Tag;
