import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";

export default function BreadcrumbC({ items }) {
  const newItems = [
    {
      link: "/",
      title: <HomeOutlined />,
    },
    ...items,
  ];
  return (
    <div className="py-2">
      <Breadcrumb
        items={newItems.map((item) => ({
          title: item.link ? <a href={item.link}>{item.title}</a> : item.title,
        }))}
      />
    </div>
  );
}
