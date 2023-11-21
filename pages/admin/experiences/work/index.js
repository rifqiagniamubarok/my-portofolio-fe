import ExperienceLayout from '@/components/Templates/ExperienceLayout';
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
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { AiFillClockCircle, AiFillCloseCircle, AiFillDelete, AiFillFileAdd } from 'react-icons/ai';

const Work = ({ works: data }) => {
  const [works, setWorks] = useState(data);
  const [workSelected, setWorkSelected] = useState(null);
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const defaultForm = {
    name: null,
    from: null,
    to: null,
    experience: [''],
  };
  const [form, setForm] = useState(defaultForm);

  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('/work');

      setWorks(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleAddWorks = async () => {
    const { name, from, to, experience } = form;
    let payload = { name, from, to, experience };
    if (to === null) {
      payload.present = true;
    } else {
      payload.to = to;
      payload.to = to;
    }
    try {
      await axiosInstance.post('/work', payload);
      await fetchData();
      setForm(defaultForm);
      onCloseCreate();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/work/${workSelected}`);
      await fetchData();
      setWorkSelected(null);
      onCloseDelete();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <ExperienceLayout>
      <Modal size={'xl'} isOpen={isOpenCreate} onClose={onCloseCreate}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Work</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Company"
                  labelPlacement="outside"
                  placeholder="Enter company"
                  value={form.name}
                  onChange={({ target: { value } }) => setForm({ ...form, name: value })}
                />
                <Input
                  type="date"
                  label="From"
                  labelPlacement="outside"
                  placeholder="Enter date"
                  value={form.from}
                  onChange={({ target: { value } }) => setForm({ ...form, from: value })}
                />
                <Input
                  type="date"
                  label="To"
                  labelPlacement="outside"
                  placeholder="Enter date"
                  value={form.to}
                  onChange={({ target: { value } }) => setForm({ ...form, to: value })}
                />
                <div>
                  <p>Activity</p>
                  <div className="space-y-2">
                    {form.experience.map((expr, index) => (
                      <div className="flex gap-2" key={index}>
                        <Input
                          type="text"
                          variant="bordered"
                          value={form.experience[index]}
                          onChange={({ target: { value } }) => {
                            let newExperience = form.experience;
                            newExperience[index] = value;
                            setForm({ ...form, experience: newExperience });
                          }}
                        />
                        <Button
                          isIconOnly
                          variant="faded"
                          color="danger"
                          disabled={form.experience.length <= 1}
                          onClick={() => {
                            let newExperience = form.experience.filter((_, id) => id !== index);
                            setForm({ ...form, experience: newExperience });
                          }}
                        >
                          <AiFillCloseCircle />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2">
                    <Button isIconOnly variant="faded" color="success" onClick={() => setForm({ ...form, experience: [...form.experience, ''] })}>
                      <AiFillFileAdd />
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleAddWorks}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size="lg" isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Work</ModalHeader>
              <ModalBody>Are sure want delete this work</ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
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
        <Button variant="faded" color="success" className="w-fit" onClick={() => onOpenCreate()}>
          <AiFillFileAdd />
          Create
        </Button>
        <Table aria-label="Example static collection table" removeWrapper>
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>From</TableColumn>
            <TableColumn>To</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {works.map(({ id, name, from, to, present }, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{dayjs(from + ' 00:00:00').format('DD MMMM YYYY')}</TableCell>
                <TableCell>{to ? dayjs(to + ' 00:00:00').format('DD MMMM YYYY') : 'Present'}</TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    variant="faded"
                    color="danger"
                    onClick={() => {
                      setWorkSelected(id);
                      onOpenDelete();
                    }}
                  >
                    <AiFillDelete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ExperienceLayout>
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
      data: { data },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/work`);

    const works = data;
    return {
      props: { works },
    };
  } catch (error) {
    return {
      props: { works: [] },
    };
  }
}

export default Work;
