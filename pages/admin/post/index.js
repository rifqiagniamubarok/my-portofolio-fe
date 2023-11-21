import PostLayout from '@/components/Templates/PostLayout';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit, AiFillFile, AiFillFileAdd } from 'react-icons/ai';
import { MdGridView } from 'react-icons/md';
import { Button, Card, Chip, Input, Pagination, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { parse } from 'cookie';
import axios from 'axios';
import { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import classNames from 'classnames';

const Post = ({ posts: data, page_info }) => {
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(page_info.page);
  const [pageSize, setPageSize] = useState(page_info.page_size);

  const fetchData = async (page = 1) => {
    try {
      const {
        data: {
          data: { data, page_info },
        },
      } = await axiosInstance.get('/post', {
        params: {
          page: page,
          page_size: 10,
        },
      });

      setPosts(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const handlePagination = async (page) => {
    try {
      await fetchData(page);
      setPage(page);
    } catch (error) {}
  };

  return (
    <PostLayout>
      <Card className="p-4 space-y-4">
        <div className="flex gap-x-2">
          <Input type="text" label="Search" variant="bordered" className="max-w-xs" size="sm" />
          <Link href="/admin/post/create">
            <Button isIconOnly variant="bordered" color="success" size="lg">
              <AiFillFileAdd />
            </Button>
          </Link>
        </div>
        <div>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>No</TableColumn>
              <TableColumn>THUMBNAIL</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {posts.map(({ id, thumbnail, slug, title, meta_description, is_publish }, index) => (
                <TableRow key={id}>
                  <TableCell>{index + 1 + (page - 1) * pageSize}</TableCell>
                  <TableCell>
                    <div className="h-10 aspect-video relative rounded-sm overflow-hidden">
                      <Image src={thumbnail} alt={slug + '-image'} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{is_publish ? <Chip color="primary">Publish</Chip> : <Chip color="default">Draft</Chip>}</TableCell>
                  <TableCell>
                    <Link href={`/admin/post/${id}`}>
                      <Button variant="faded" color="primary">
                        <MdGridView /> Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classNames('flex justify-center mt-4 mb-4', page_info.total_pages <= 1 && 'hidden')}>
            <Pagination total={page_info.total_pages} initialPage={1} page={page} onChange={handlePagination} />
          </div>
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
        data: { data, page_info },
      },
    } = await axios.get(`${process.env.SERVER_BACKEND_URL}/post`, {
      params: { page: 1, page_size: 10 },
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    const posts = data;
    return {
      props: { posts, page_info },
    };
  } catch (error) {
    return {
      props: { posts: [], page_info: {} },
    };
  }
}

export default Post;
