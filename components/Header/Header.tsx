// "use client";
import { FC, HTMLAttributes } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useParams } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismaDB from "@/lib/prismadb";
import { Store } from "@prisma/client";
import { useStoreListStore } from "@/src/entity/Store/model/store";
import { getStoreList } from "@/actions/get-store-list";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  // storeList: Store[];
}

export const Header: FC<HeaderProps> = async (props) => {
  // const { className, storeList } = props;
  const { className } = props;
  // const { storeSlug } = useParams();
  const { userId } = auth();
  // //
  if (!userId) {
    return null;
  }
  // const storeList = await prismaDB.store.findMany({
  //   where: {
  //     userId,
  //   },
  // });
  //
  // console.log("list >>>>", storeList);
  // console.log("slug", storeSlug);

  // console.log("params", params);

  // const storeList = await getStoreList(userId);
  // console.log("storeList", storeList);
  // useStoreListStore.setState({ data: storeList });
  // const state = useStoreListStore.getState();
  // console.log("get state", state);

  return (
    <div className={className}>
      <div className="m-auto max-w-7xl p-4">
        {/* <Navbar storeList={storeList} /> */}
        <Navbar />
      </div>
    </div>
  );
};
