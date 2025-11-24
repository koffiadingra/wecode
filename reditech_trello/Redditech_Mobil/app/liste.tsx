import AddList from "../components/AddList";
import CodeList from "../components/CodeList";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import Header from "../components/Header";

export default function Liste() {
  const params = useLocalSearchParams();
  const boardName = params.boardName as string;
  
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Header 
        title={boardName || "Tableau"} 
        showBack={true}
        onBack={handleBack}
        showProfile={true}
      />
      <CodeList />
    </>
  );
}