// components/CSVUpload.tsx
"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CSVUpload = ({
  onUpload,
}: {
  onUpload: (csvText: string) => Promise<void>;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const csvText = event.target?.result as string;
        onUpload(csvText); // Pass the CSV data to the parent component
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload CSV</Button>
    </div>
  );
};
