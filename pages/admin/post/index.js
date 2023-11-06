import PostLayout from '@/components/Templates/PostLayout';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Button, Card, Input, Pagination, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { parse } from 'cookie';

const Post = () => {
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
              <TableColumn>NAME</TableColumn>
              <TableColumn className="hidden md:flex items-center">ABOUT</TableColumn>
              <TableColumn></TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell className="hidden md:inline-block">loremslkjfkldfjklj</TableCell>
                  <TableCell>
                    <Switch />
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button isIconOnly variant="faded" color="warning">
                      <AiFillEdit />
                    </Button>
                    <Button isIconOnly variant="faded" color="danger">
                      <AiFillDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 mb-4">
            <Pagination total={20} initialPage={1} />
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

  return {
    props: { data: 'hello' },
  };
}

export default Post;
