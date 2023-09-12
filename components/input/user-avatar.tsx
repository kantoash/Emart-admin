
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface UserAvatarProps {
  userImage: string | null,
  isLarge?: boolean
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userImage,
  isLarge
}) => {

  return (
    <Avatar className={cn(isLarge ? 'w-20 h-20' : 'w-10 h-10')}>
      <AvatarImage src={ userImage || "/placeholder.jpg"} />
    </Avatar>
  );
};
