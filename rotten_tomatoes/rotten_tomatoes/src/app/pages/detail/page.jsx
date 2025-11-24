"use client";

import Header from "@/app/components/Header";
import Detail from "@/app/components/Detail";
import { Suspense } from "react";

export default function Details() {
  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <Header />

        <Detail />
      </Suspense>
    </>
  );
}
