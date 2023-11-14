import axiosInstance from '@/utils/axiosInstance';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure } from '@nextui-org/react';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const styleDefaultImage = 'w-full aspect-video rounded-md relative overflow-hidden cursor-pointer bg-black cursor-pointer';

const Gallery = ({ isOpen: isOpenRequire, onClose: onCloseRequire, onChange }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [photoSelected, setPhotoSelected] = useState(null);


  const fetchData = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await axiosInstance.get('/image', {
        params: {
          page: 1,
          page_size: 20,
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

  useEffect(() => {
    if (isOpenRequire && !isOpen) {
      onOpen();
    }
  }, [isOpen, isOpenRequire]);

  const handleClose = () => {
    onClose();
    onCloseRequire();
    setPhotoSelected(null);
  };

  const handleSave = () => {
    onChange && onChange(photoSelected);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Chooose Image</ModalHeader>
            <ModalBody className="">
              <ScrollShadow className="max-h-[400px] ">
                <div className="grid grid-cols-4 gap-4">
                  {photos.map(({ id, path }, index) => (
                    <div className={classNames(styleDefaultImage, path === photoSelected && 'border-4 border-primary')} key={index} onClick={() => setPhotoSelected(path)}>
                      <Image fill src={path} alt="Image" className="max-w-40 object-contain" />
                    </div>
                  ))}
                </div>
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSave} isDisabled={photoSelected === null}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Gallery;
