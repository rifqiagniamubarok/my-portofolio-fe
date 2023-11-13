import Editor from '@/components/Organisms/Editor';
import AdminLayout from '@/components/Templates/AdminLayout';
import { Card } from '@nextui-org/react';
import React from 'react';

const Create = () => {
  return (
    <AdminLayout>
      <Card className="p-4">
        <div className="pb-52">
          <Editor />
        </div>
      </Card>
    </AdminLayout>
  );
};

export default Create;
