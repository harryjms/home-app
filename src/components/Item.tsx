import React, { useEffect, useMemo, useState } from "react";

export interface Item {
  name: string;
  description?: string;
  icon?: string;
  url: string;
  healthCheckUrl?: string;
}

const Item: React.FC<{ item: Item }> = ({ item }) => {
  const [healthStatus, setHealthStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const url = `/api/status?url=` + (item.healthCheckUrl || item.url);
    (async () => {
      setHealthStatus(null);
      const status = await fetch(url).then((res) => res.status);
      if (status >= 200 && status < 400) {
        setHealthStatus(true);
      } else {
        setHealthStatus(false);
      }
    })();
  }, [item.url, item.healthCheckUrl]);

  const status = useMemo(() => {
    switch (healthStatus) {
      case true:
        return <div className="w-full h-full bg-green-500"></div>;
      case false:
        return <div className="w-full h-full bg-red-500"></div>;
      default:
        return (
          <div className="w-full h-full bg-yellow-500 animate-pulse"></div>
        );
    }
  }, [healthStatus]);

  return (
    <div
      key={item.url}
      className="bg-white overflow-hidden rounded-sm shadow-sm hover:ring-2 ring-blue-300"
    >
      <a href={item.url} target="_blank" className="flex p-2 items-center">
        <div className="rounded-full bg-gray-200 w-[32px] h-[32px] overflow-hidden">
          {item.icon && (
            <img src={item.icon} className="min-w-full min-h-full" />
          )}
        </div>
        <div className="flex flex-1 flex-col ml-2">
          <div className="font-medium">{item.name}</div>
          {item.description && (
            <div className="text-xs text-gray-600">{item.description}</div>
          )}
        </div>
        <div>
          <div className="rounded-full w-[8px] h-[8px] overflow-hidden">
            {status}
          </div>
        </div>
      </a>
    </div>
  );
};

export default Item;
