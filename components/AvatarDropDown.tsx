import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import React from "react";
import { SessionContextValue, signOut, useSession } from "next-auth/react";

const AvatarDropDown = () => {
  const session: SessionContextValue = useSession();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={
              session.data?.user?.image ? session.data.user.image : undefined
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{session.data?.user?.name}</p>
            <p className="font-semibold">{session.data?.user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="analytics">Visitor mode</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AvatarDropDown;
