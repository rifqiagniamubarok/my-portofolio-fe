import IconUpload from '@/components/Organisms/IconUpload';
import AdminLayout from '@/components/Templates/AdminLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Input, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import classNames from 'classnames';
import { parse } from 'cookie';
import Image from 'next/image';

import React, { useState } from 'react';
import { AiFillCloseCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai';

const Icons = ({ icons: data }) => {
  const [icons, setIcons] = useState(data);
  const [uploadedIcon, setUploadedIcon] = useState(null);
  const [hoverIcon, setHoverIcon] = useState(null);
  const [previewIcon, setPreviewIcon] = useState(null);
  const defaultForm = {
    name: '',
    about: '',
    file: null,
  };
  const [form, setForm] = useState(defaultForm);

  const fetchData = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await axiosInstance.get('/icon', {
        params: {
          page: 1,
          page_size: 18,
        },
      });

      setIcons(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const addData = async (form) => {
    try {
      await axiosInstance.post('/icon', form);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const { isOpen: isOpenPreview, onOpen: onOpenPreview, onClose: onClosePreview } = useDisclosure();

  const handleIconUpload = (file) => {
    setUploadedIcon(URL.createObjectURL(file));
    setForm({ ...form, file: file });
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('icon', form.file);
    formData.append('name', form.name);
    formData.append('about', form.about);

    await addData(formData);
    setForm(defaultForm);
    setUploadedIcon(null);
  };

  return (
    <AdminLayout>
      <Modal isOpen={isOpenPreview} onClose={onClosePreview} size="xl">
        <ModalContent>
          {(onClose) => (
            <div>
              <div className="w-full aspect-video bg-black relative">
                <Image src={previewIcon} alt="image-preview" fill className="object-contain" loading="lazy" />
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-2">
            <div>
              {uploadedIcon ? (
                <div
                  className="relative h-52 aspect-video rounded-md overflow-hidden cursor-pointer bg-slate-300"
                  onClick={() => {
                    setPreviewIcon(uploadedIcon);
                    onOpenPreview();
                  }}
                >
                  <Button isIconOnly radius="sm" size="sm" variant="flat" color="danger" onClick={() => setUploadedIcon(null)} className="absolute z-20 top-1 right-1">
                    <AiFillCloseCircle />
                  </Button>
                  <Image src={uploadedIcon} fill alt="new-icon" className="object-contain" />
                </div>
              ) : (
                <IconUpload onIconUpload={handleIconUpload} />
              )}
            </div>

            <div className="space-y-2">
              <Input label="Name" variant="bordered" size="sm" value={form.name} onChange={({ target: { value } }) => setForm({ ...form, name: value })} />
              <Input label="About" variant="bordered" size="sm" value={form.about} onChange={({ target: { value } }) => setForm({ ...form, about: value })} />
              <Button color="primary" variant="solid" onClick={handleAdd}>
                Add
              </Button>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="grid grid-cols-6 gap-4">
            {icons.map(({ id, path }, index) => (
              <div
                key={index}
                className="w-full aspect-video rounded-md relative overflow-hidden cursor-pointer bg-black"
                onMouseOver={() => setHoverIcon(id)}
                onMouseOut={() => setHoverIcon(null)}
                onClick={() => {
                  setPreviewIcon(path);
                  onOpenPreview();
                }}
              >
                <div className={classNames(id == hoverIcon ? 'absolute z-20 top-1 right-1 flex gap-1' : 'hidden')}>
                  <Button isIconOnly radius="sm" size="sm" variant="faded" color="warning" className="">
                    <AiFillEdit />
                  </Button>
                  <Button isIconOnly radius="sm" size="sm" variant="faded" color="danger" className="">
                    <AiFillDelete />
                  </Button>
                </div>
                <Image fill src={path} alt="Image" className="max-w-40 object-contain" />
              </div>
            ))}
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
      data: {
        data: { data },
      },
    } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/icon`, {
      params: { page: 1, page_size: 18 },
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const icons = data;
    return {
      props: { icons },
    };
  } catch (error) {
    return {
      props: { photos: [] },
    };
  }
}

export default Icons;
