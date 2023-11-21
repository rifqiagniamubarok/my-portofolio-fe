import AdminLayout from '@/components/Templates/AdminLayout';
import { Button, Card, Input, Modal, ModalBody, ModalContent, Image as NuiImage, Skeleton, useDisclosure } from '@nextui-org/react';
import { AiFillClockCircle, AiFillCloseCircle, AiFillDelete, AiFillEdit, AiOutlineFileImage } from 'react-icons/ai';
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { parse } from 'cookie';
import axios from 'axios';
import ImageUpload from '@/components/Organisms/ImageUpload';
import classNames from 'classnames';
import axiosInstance from '@/utils/axiosInstance';

const Photos = ({ photos: data }) => {
  const [photos, setPhotos] = useState(data);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
      } = await axiosInstance.get('/image', {
        params: {
          page: 1,
          page_size: 18,
        },
      });

      setPhotos(data);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async (form) => {
    try {
      await axiosInstance.post('/image', form);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const { isOpen: isOpenPreview, onOpen: onOpenPreview, onClose: onClosePreview } = useDisclosure();

  const handleImageUpload = (file) => {
    setUploadedImage(URL.createObjectURL(file));
    setForm({ ...form, file: file });
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('image', form.file);
    formData.append('name', form.name);
    formData.append('about', form.about);

    await addData(formData);
    setForm(defaultForm);
    setUploadedImage(null);
  };

  return (
    <AdminLayout>
      <Modal isOpen={isOpenPreview} onClose={onClosePreview} size="xl">
        <ModalContent>
          {(onClose) => (
            <div>
              <div className="w-full aspect-video bg-black relative">
                <Image src={previewImage} alt="image-preview" fill className="object-contain" loading="lazy" />
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-2">
            <div>
              {uploadedImage ? (
                <div
                  className="relative h-52 aspect-video rounded-md overflow-hidden cursor-pointer bg-slate-300"
                  onClick={() => {
                    setPreviewImage(uploadedImage);
                    onOpenPreview();
                  }}
                >
                  <Button isIconOnly radius="sm" size="sm" variant="flat" color="danger" onClick={() => setUploadedImage(null)} className="absolute z-20 top-1 right-1">
                    <AiFillCloseCircle />
                  </Button>
                  <Image src={uploadedImage} fill alt="new-image" className="object-contain" />
                </div>
              ) : (
                <ImageUpload onImageUpload={handleImageUpload} />
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
            {photos.map(({ id, path }, index) => (
              <div
                className="w-full aspect-video rounded-md relative overflow-hidden cursor-pointer bg-black"
                key={index}
                onMouseOver={() => setHoverImage(id)}
                onMouseOut={() => setHoverImage(null)}
                onClick={() => {
                  setPreviewImage(path);
                  onOpenPreview();
                }}
              >
                <div className={classNames(id == hoverImage ? 'absolute z-20 top-1 right-1 flex gap-1' : 'hidden')}>
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
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/image`, {
      params: { page: 1, page_size: 18 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const photos = data;
    return {
      props: { photos },
    };
  } catch (error) {
    return {
      props: { photos: [] },
    };
  }
}

export default Photos;
