
import React from 'react';
import EnhancedAdminDashboard from './EnhancedAdminDashboard';
import SampleDataInserter from './SampleDataInserter';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Sample Data Inserter - Keep for development */}
      <SampleDataInserter />
      
      {/* Enhanced Dashboard */}
      <EnhancedAdminDashboard />
    </div>
  );
};

export default AdminDashboard;
