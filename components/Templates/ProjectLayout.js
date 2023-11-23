import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import AdminLayout from './AdminLayout';
import { Card, Tab, Tabs } from '@nextui-org/react';

const ProjectLayout = ({ children }) => {
  const router = useRouter();
  const getpath = usePathname();
  const pathList = [
    {
      name: 'project',
      path: '/admin/project',
    },
    {
      name: 'tech',
      path: '/admin/project/tech',
    },
  ];

  const currentPath = pathList.find((path) => path.path === getpath);
  const currentPage = currentPath?.name || 'Post';

  const handleTabs = (key) => {
    router.push(key);
  };
  return (
    <AdminLayout>
      <section className="space-y-2 md:space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 ">
          <Card className="p-4">
            <div>
              <p>Total Posts</p>
              <p className="text-2xl font-semibold">400</p>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p>Total Published</p>
              <p className="text-2xl font-semibold">400</p>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p>Total Views</p>
              <p className="text-2xl font-semibold">400</p>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p>Total Likes</p>
              <p className="text-2xl font-semibold">400</p>
            </div>
          </Card>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex flex-wrap gap-4">
            <Tabs aria-label="Tabs radius" onSelectionChange={handleTabs} selectedKey={getpath}>
              <Tab key="/admin/project" title="Project" />
              <Tab key="/admin/project/tech" title="Tech" />
            </Tabs>
          </div>
        </div>

        <main>{children}</main>
      </section>
    </AdminLayout>
  );
};

export default ProjectLayout;
