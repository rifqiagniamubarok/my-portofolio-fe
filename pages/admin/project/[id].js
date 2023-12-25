import Article from '@/components/Organisms/Article';
import AdminLayout from '@/components/Templates/AdminLayout';
import ProjectLayout from '@/components/Templates/ProjectLayout';
import ImageCustom from '@/components/atoms/ImageCustom';
import ScaleSymbol from '@/components/atoms/ScaleSymbol';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Divider, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { AiFillLike, AiOutlineSelect, AiOutlineSend } from 'react-icons/ai';
import { FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { MdPublish, MdUnarchive, MdModeEditOutline, MdOutlineLink } from 'react-icons/md';

const ProjectDetail = ({ project: data }) => {
  const [project, setProject] = useState(data);

  const router = useRouter();
  const id = router.query.id;

  const publishProject = async () => {
    try {
      let newData;
      if (project.is_publish) {
        const {
          data: { data },
        } = await axiosInstance.post(`/project/unpublish/${id}`);
        newData = data;
      } else {
        const {
          data: { data },
        } = await axiosInstance.post(`/project/publish/${id}`);
        newData = data;
      }
      setProject(newData);
    } catch (error) {
      console.error({ error });
    }
  };

  const handlePublish = async () => {
    await publishProject();
  };
  return (
    <AdminLayout>
      {' '}
      <div className=" space-y-4">
        <Card className="p-4  ">
          <div className="w-full flex justify-between items-end">
            <div>
              <p className="text-base text-slate-400">Slug:</p>
              <p className="text-lg font-semibold">{project.slug}</p>
            </div>
            <div>
              <Link target="_blank" href={`/blog/${project.slug}`}>
                <Button className="" isIconOnly color="primary" variant="faded" disabled={!project.is_publish}>
                  <FaExternalLinkAlt />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <FaEye className="fill-primary" />
              <p>{project.view}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              <AiFillLike className="" />
              <p>{project.like}</p>
            </div>
          </div>
        </Card>
        <div className="fixed bottom-4 right-4 z-40">
          <Card className="p-2 ">
            <div className="space-x-2">
              <Tooltip content={project.is_publish ? 'Archive' : 'Publish'} color={!project.is_publish ? 'primary' : 'warning'}>
                <Button color={!project.is_publish ? 'primary' : 'warning'} variant="faded" isIconOnly onClick={handlePublish}>
                  {!project.is_publish ? <MdPublish /> : <MdUnarchive />}
                </Button>
              </Tooltip>
              <Tooltip content={'Edit'} color={'primary'}>
                <Link href={`/admin/project/edit/${project.id}`}>
                  <Button color={'primary'} variant="faded" isIconOnly onClick={handlePublish}>
                    <MdModeEditOutline />
                  </Button>
                </Link>
              </Tooltip>
            </div>
          </Card>
        </div>
        <Card className="relative overflow-hidden">
          <div className="w-full h-52 relative overflow-hidden">
            <ImageCustom src={project.thumbnail} alt={project.slug + '-thumb'} fill className="object-cover" />
          </div>
          <div className="px-4 py-8">
            <div>
              <p className="text-3xl font-semibold">{project.title}</p>
              <p className="text-base text-primary font-semibold">{dayjs(project.createdAt).format('DD MMMM YYYY')}</p>
              <p className="text-base">{project.meta_description}</p>
            </div>
            <Divider className="my-4" />
            <div className="grid grid-cols-6">
              <div className="col-span-5">
                <Article body={project.body} />
              </div>
              <div className="space-y-4">
                <div className="">
                  <ScaleSymbol />
                </div>
                <div>
                  {project.Project_Views.map(({ name, url }, index) => (
                    <Link key={index} href={url} target="_blank">
                      <Button className="w-full" variant="faded" endContent={<MdOutlineLink />}>
                        {name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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

  const { id } = context.query;

  try {
    const {
      data: { data },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/project/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const project = data;
    return {
      props: { project },
    };
  } catch (error) {
    return {
      props: { project: {} },
    };
  }
}

export default ProjectDetail;
