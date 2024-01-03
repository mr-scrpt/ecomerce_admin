"use client";

import { FC, HTMLAttributes } from "react";
import { Notice } from "../Notice/Notice";
import { useOrigin } from "../../hook/useOrigin";
import { Heading } from "../Heading";

interface NoticeApiProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  store: string;
  description: string;
  entity?: string;
  entityId?: string;
  onlyMain?: boolean;
}

export const NoticeApi: FC<NoticeApiProps> = (props) => {
  const {
    title,
    description,
    store,
    entity,
    entityId,
    onlyMain = false,
  } = props;
  const origin = useOrigin();
  const routeBase = `${origin}/api/${store}`;
  const routeComputed = `${routeBase}/${entity}`;
  return (
    <div className="flex flex-col gap-4">
      <Heading title={title} description={description} />
      {!onlyMain ? (
        <>
          <Notice title="GET" variant="public" description={routeComputed} />
          <Notice
            title="GET"
            variant="public"
            description={`${routeComputed}/{${entityId}}`}
          />
          {/* <Notice */}
          {/*   title="POST" */}
          {/*   variant="admin" */}
          {/*   description={`${routeComputed}/`} */}
          {/* /> */}
          {/* <Notice */}
          {/*   title="PATCH" */}
          {/*   variant="admin" */}
          {/*   description={`${routeComputed}/{${entityId}}`} */}
          {/* /> */}
          {/* <Notice */}
          {/*   title="DELETE" */}
          {/*   variant="admin" */}
          {/*   description={`${routeComputed}/{${entityId}}`} */}
          {/* /> */}
        </>
      ) : (
        <Notice title="GET" variant="public" description={routeBase} />
      )}
    </div>
  );
};
