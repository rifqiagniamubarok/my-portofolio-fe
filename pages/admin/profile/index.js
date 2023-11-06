import AdminLayout from '@/components/Templates/AdminLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Divider, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, Textarea, Tooltip, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { LuView } from 'react-icons/lu';

const Profile = ({ profile: data }) => {
  const [profile, setProfile] = useState(data);
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const { isOpen: isOpenName, onOpen: onOpenName, onOpenChange: onOpenChangeName, onClose: onCloseName } = useDisclosure();
  const { isOpen: isOpenAbout, onOpen: onOpenAbout, onOpenChange: onOpenChangeAbout, onClose: onCloseAbout } = useDisclosure();

  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('/profile');
      setProfile(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const updateData = async (payload) => {
    try {
      await axiosInstance.patch('/profile', payload);
      await fetchData();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleOpenToWork = async () => {
    try {
      await updateData({ open_to_work: !profile.open_to_work });
    } catch (error) {
      console.error({ error });
    }
  };

  const toggleNameEdit = () => {
    onOpenName();
  };
  const toggleAboutEdit = () => {
    onOpenAbout();
  };

  const handleEditName = async (e) => {
    e.preventDefault();
    try {
      await updateData({ name });
    } catch (error) {
      console.error({ error });
    } finally {
      onCloseName();
    }
  };

  const handleEditAbout = async (e) => {
    e.preventDefault();
    try {
      await updateData({ about });
    } catch (error) {
      console.error({ error });
    } finally {
      onCloseAbout();
    }
  };

  const textAbout = about.split('\n').map((line, index) => (
    <>
      <p key={index} className="mt-2">
        {line}
      </p>
    </>
  ));
  return (
    <AdminLayout>
      <Modal isOpen={isOpenName} onOpenChange={onOpenChangeName} size="3xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleEditName}>
              <ModalHeader className="flex flex-col gap-1">Edit About</ModalHeader>
              <ModalBody>
                <Input label="Name" value={name} onChange={({ target: { value } }) => setName(value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenAbout} onOpenChange={onOpenChangeAbout} size="3xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleEditAbout}>
              <ModalHeader className="flex flex-col gap-1">Edit About</ModalHeader>
              <ModalBody>
                <Textarea
                  variant="bordered"
                  minRows={30}
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  value={about}
                  fullWidth
                  onChange={({ target: { value } }) => setAbout(value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-x-2">
            <Image width={300} height={300} src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="NextUI hero Image" />
            <div className="flex flex-col gap-y-2">
              <Tooltip showArrow={true} content="View" placement="right" color="success">
                <Button color="success" isIconOnly variant="faded">
                  <LuView />
                </Button>
              </Tooltip>
              <Tooltip showArrow={true} content="Edit" placement="right" color="warning">
                <Button color="warning" isIconOnly variant="faded">
                  <AiFillEdit />
                </Button>
              </Tooltip>
              <Tooltip showArrow={true} content="Delete" placement="right" color="danger">
                <Button color="danger" isIconOnly variant="faded">
                  <AiFillDelete />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="">
            <p className="text-gray-400">Name :</p>
            <p>{profile.name}</p>
            <div className="space-x-2 mt-4">
              <Tooltip showArrow={true} content="Edit" placement="right" color="warning">
                <Button color="warning" isIconOnly variant="faded" onClick={toggleNameEdit}>
                  <AiFillEdit />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="">
            <p className="text-gray-400">About :</p>
            <div>{textAbout}</div>
            <div className="space-x-2 mt-4">
              <Tooltip showArrow={true} content="Edit" placement="right" color="warning">
                <Button color="warning" isIconOnly variant="faded" onPress={toggleAboutEdit}>
                  <AiFillEdit />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex gap-x-4">
            <p>Open to work</p>
            <Switch isSelected={profile.open_to_work} onChange={handleOpenToWork} />
          </div>
        </Card>
      </div>
    </AdminLayout>
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
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const profile = data;

    return {
      props: { profile: profile },
    };
  } catch (error) {
    return {
      props: { profile: null },
    };
  }
}

export default Profile;
