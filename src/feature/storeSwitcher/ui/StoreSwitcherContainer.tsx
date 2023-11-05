"use server";
import { useStoreListStore } from "@/src/entity/Store/model/store";
import { FC, HTMLAttributes } from "react";
import { StoreSwitcher } from "./StoreSwitcher";
import prismaDB from "@/lib/prismadb";
import axios from "axios";

interface StoreSwitcherProps extends HTMLAttributes<HTMLDivElement> {}

export const StoreSwitcherContainer: FC<StoreSwitcherProps> = async () => {
  // const { fetchStore, data } = useStoreListStore.getState();
  // fetchStore();
  // const data = await prismaDB.store.findMany({
  // where: {
  //   userId,
  // },
  // });
  // console.log("=>>>>>>>$$$$$$ before");
  const { data } = await axios.get("/api/store");

  // console.log("=>>>>>>>$$$$$$", data);
  return <StoreSwitcher items={data} />;
};
