import formatDateTime from "@/utils/formatDate";
import { useLongPress } from "@uidotdev/usehooks";
import { memo } from "react";

const Message = memo(({ data: { id, content, createAt }, setModal, mode }) => {
  const attr = useLongPress(() => setModal(id), { threshold: 500 });

  return mode === "sender" ? (
    <div
      {...attr}
      className="rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow-md ml-auto bg-primary text-white dark:text-black text-right"
    >
      {content}
      <span className="text-xs text-gray-400 dark:text-gray-600 mt-1 block text-left">
        {formatDateTime(createAt)}
      </span>
    </div>
  ) : (
    <div
      {...attr}
      className="rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow-md mr-auto bg-secondary relative"
    >
      <p>{content}</p>
      <span className="text-xs text-muted-foreground mt-1 block text-right">
        {formatDateTime(createAt)}
      </span>
    </div>
  );
});

export default Message;
