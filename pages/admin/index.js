import AdminLayout from '@/components/Templates/AdminLayout';
import { parse } from 'cookie';
import React from 'react';
import { Button, Card, Divider, Image, Input, Switch, Tooltip } from '@nextui-org/react';
import { AiFillLike, AiOutlineEye } from 'react-icons/ai';
import { CiMap } from 'react-icons/ci';
import Link from 'next/link';

const Admin = ({ data }) => {
  return (
    <AdminLayout>
      <div className="space-y-2 md:space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 ">
          <Card className="p-4">
            <div>
              <p>Total Views</p>
            </div>
            <div>
              <p className="text-2xl md:text-4xl font-semibold">4000</p>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p>Total Likes</p>
            </div>
            <div>
              <p className="text-2xl md:text-4xl font-semibold">4000</p>
            </div>
          </Card>
          <Card className="p-4 col-span-2 md:col-span-1">
            <div>
              <p>Total Click</p>
            </div>
            <div>
              <p className="text-2xl md:text-4xl font-semibold">4000</p>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <Card className="p-4">
            <div>
              <p className="text-xl text-center mb-5">Top Blogs</p>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
              <tbody className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap md:px-4 py-2 font-medium ">John Doe</td>
                    <td className="whitespace-nowrap md:px-4 py-2  ">
                      <div className="grid grid-cols-2">
                        <div className="flex items-center gap-1 ">
                          <AiOutlineEye className=" text-orange-500" />
                          409
                        </div>
                        <div className="flex items-center gap-1 ">
                          <AiFillLike className=" text-blue-600" />
                          409
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <Link href="/admin/post">
                <Button isIconOnly color="success" variant="faded">
                  <CiMap />
                </Button>
              </Link>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p className="text-xl text-center mb-5">Top Social Media</p>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
              <tbody className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap md:px-4 py-2 font-medium ">John Doe</td>
                    <td className="whitespace-nowrap md:px-4 py-2  ">
                      <div className="grid grid-cols-2">
                        <div className="flex items-center gap-1 ">
                          <AiOutlineEye className="text-orange-500" />
                          409
                        </div>
                        <div className="flex items-center gap-1 ">
                          <AiFillLike className="text-blue-600" />
                          409
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <Link href="/admin/post">
                <Button isIconOnly color="success" variant="faded">
                  <CiMap />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;

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
