import React from 'react';
import AdminLayout from './AdminLayout';
import { Card, Tab, Tabs } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

const ExperienceLayout = ({ children }) => {
  const router = useRouter();
  const getpath = usePathname();
  const handleTabs = (key) => {
    router.push(key);
  };
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <p>Total view</p>
            <p className="text-4xl">450</p>
          </Card>
          <Card className="p-4">
            <p>Work view</p>
            <p className="text-4xl">450</p>
          </Card>
          <Card className="p-4">
            <p>Education view</p>
            <p className="text-4xl">450</p>
          </Card>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex flex-wrap gap-4">
            <Tabs aria-label="Tabs radius" onSelectionChange={handleTabs} selectedKey={getpath}>
              <Tab key="/admin/experiences" title="Experiences" />
              <Tab key="/admin/experiences/work" title="Work" />
              <Tab key="/admin/experiences/education" title="Education" />
            </Tabs>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </AdminLayout>
  );
};

export default ExperienceLayout;
