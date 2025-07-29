
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { insertSampleMenuItems } from '@/hooks/useSampleData';
import { useToast } from '@/hooks/use-toast';

const SampleDataInserter = () => {
  const [isInserting, setIsInserting] = useState(false);
  const { toast } = useToast();

  const handleInsertSampleData = async () => {
    setIsInserting(true);
    try {
      await insertSampleMenuItems();
      toast({
        title: "Success!",
        description: "Sample menu items have been inserted into the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to insert sample data. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Insert sample menu items into the database to test the application.
        </p>
        <Button 
          onClick={handleInsertSampleData}
          disabled={isInserting}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isInserting ? 'Inserting...' : 'Insert Sample Menu Items'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleDataInserter;
