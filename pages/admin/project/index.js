import ProjectLayout from '@/components/Templates/ProjectLayout';
import ImageCustom from '@/components/atoms/ImageCustom';
import { Button, Card, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdGridView } from 'react-icons/md';

const AdminProject = ({ projects: data }) => {
  const [projects, setProjects] = useState(data);
  return (
    <ProjectLayout>
      <Card className="p-4 space-y-4">
        <div className="flex gap-x-2">
          <Input type="text" label="Search" variant="bordered" className="max-w-xs" size="sm" />
          <Link href="/admin/project/create">
            <Button isIconOnly variant="bordered" color="success" size="lg">
              <AiFillFileAdd />
            </Button>
          </Link>
        </div>
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>THUMBNAIL</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>SCALE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {projects.map(({ id, slug, is_publish, title, thumbnail, scale, status }) => (
              <TableRow key={id}>
                <TableCell>1</TableCell>
                <TableCell>
                  <div className="h-10 aspect-video relative rounded-sm overflow-hidden">
                    <ImageCustom src={thumbnail} alt={slug + '-image'} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{scale}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <Link href={`/admin/project/${id}`}>
                    <Button variant="faded" color="primary">
                      <MdGridView /> Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
        data: { data, page_info },
      },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/project`, {
      params: { page: 1, page_size: 10 },
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const projects = data;
    return {
      props: { projects, page_info },
    };
  } catch (error) {
    return {
      props: { projects: [], page_info: {} },
    };
  }
}

export default AdminProject;
