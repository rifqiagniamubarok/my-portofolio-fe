import GalleryIcon from '@/components/Organisms/GalleryIcon';
import ProjectLayout from '@/components/Templates/ProjectLayout';
import ImageCustom from '@/components/atoms/ImageCustom';
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
import classNames from 'classnames';
import { parse } from 'cookie';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillCloseCircle, AiFillDelete, AiFillEdit, AiFillFileAdd, AiFillFileImage, AiOutlineLoading3Quarters } from 'react-icons/ai';

const Tech = ({ tech_stacks: data }) => {
  const [techStacks, setTechStacks] = useState(data);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [techSelect, setTechSelect] = useState(null);

  const [isOpenGallery, setIsOpenGallery] = useState(false);

  const { isOpen: isOpenForm, onOpen: onOpenForm, onOpenChange: onOpenChangeForm, onClose: onCloseForm } = useDisclosure();

  const [formAdd, setFormAdd] = useState({
    icon: null,
    name: '',
    about: '',
  });

  const toggleEdit = (tech) => {
    if (!isOpenForm) {
      const { name, about, id, icon_url: icon } = tech;
      setFormAdd({ name, about, icon });
      setTechSelect(id);
      onOpenForm();
    } else {
      setFormAdd({
        icon: null,
        name: null,
        about: null,
      });
      onCloseForm();
      setTechSelect(null);
    }
  };

  const fetchTechStacks = async (search) => {
    try {
      setIsLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await axiosInstance.get('/tech-stack', { params: { search } });
      setTechStacks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = ({ target }) => {
    const { value } = target;
    setIsLoading(true);
    setSearch(value);
    debouncedSearch(value);
  };

  const debouncedSearch = debounce(async (searchTerm) => {
    fetchTechStacks(searchTerm);
  }, 1000);

  const handleIconFormAdd = ({ path, detail }) => {
    setFormAdd({ ...formAdd, icon: path });
  };
  const handleAddTech = async () => {
    try {
      await axiosInstance.post('tech-stack', formAdd);
      await fetchTechStacks();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
      onCloseForm();
      setTechSelect(null);
    }
  };
  const handleEditTech = async () => {
    try {
      await axiosInstance.patch(`tech-stack/${techSelect}`, formAdd);
      await fetchTechStacks();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
      onCloseForm();
      setTechSelect(null);
      setFormAdd({
        icon: null,
        name: null,
        about: null,
      });
    }
  };

  return (
    <ProjectLayout>
      <GalleryIcon isOpen={isOpenGallery} onClose={() => setIsOpenGallery(!isOpenGallery)} onChange={handleIconFormAdd} />
      <Modal isOpen={isOpenForm} onOpenChange={onOpenChangeForm}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Tech Stack</ModalHeader>
              <ModalBody className="text-black dark:text-white">
                <div className="space-y-4">
                  {/* Image */}
                  <div className="space-y-4">
                    {!formAdd.icon ? (
                      <div className="w-full aspect-video bg-primary rounded-md flex items-center justify-center" onClick={() => setIsOpenGallery(true)}>
                        <AiFillFileImage className="w-36 h-36 text-white" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video relative overflow-hidden rounded-md">
                        <div className="absolute z-20 top-1 right-1 flex gap-2">
                          <Button isIconOnly radius="sm" size="sm" variant="flat" color="warning" onClick={() => setIsOpenGallery(true)} className="">
                            <AiFillEdit />
                          </Button>
                          <Button isIconOnly radius="sm" size="sm" variant="flat" color="danger" onClick={() => setFormAdd({ ...formAdd, icon: null })} className="">
                            <AiFillCloseCircle />
                          </Button>
                        </div>
                        <ImageCustom src={formAdd.icon} alt="image" fill className="object-fit" />
                      </div>
                    )}
                  </div>
                  <Input type="text" label="Name" variant="bordered" required value={formAdd.name} onChange={({ target: { value } }) => setFormAdd({ ...formAdd, name: value })} />
                  <Input
                    type="text"
                    label="About"
                    variant="bordered"
                    required
                    value={formAdd.about}
                    onChange={({ target: { value } }) => setFormAdd({ ...formAdd, about: value })}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={toggleEdit}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (techSelect) handleEditTech();
                    else handleAddTech();
                  }}
                >
                  {/* {tagSelect ? 'Edit' : 'Add'} */}
                  Add
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
              <TableColumn>ICON</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn className="hidden md:flex items-center">ABOUT</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading}>
              {techStacks.map((stack, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="h-10 aspect-square relative rounded-sm overflow-hidden">
                      <ImageCustom src={stack.icon_url || ''} alt={stack.name + '-image'} fill className="object-contain" />
                    </div>
                  </TableCell>
                  <TableCell>{stack.name}</TableCell>
                  <TableCell className="hidden md:inline-block">{stack.about || '-'}</TableCell>
                  <TableCell className="space-x-2">
                    <Button isIconOnly variant="faded" color="warning" onClick={() => toggleEdit(stack)}>
                      <AiFillEdit />
                    </Button>
                    <Button isIconOnly variant="faded" color="danger" onClick={() => toggleDelete(stack.id)}>
                      <AiFillDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </ProjectLayout>
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
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/tech-stack`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });
    // const { data } = await axiosInstance.get('/tag');

    const tech_stacks = data;
    return {
      props: { tech_stacks },
    };
  } catch (error) {
    return {
      props: { tech_stacks: [] },
    };
  }
}

export default Tech;
