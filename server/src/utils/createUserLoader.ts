// import DataLoader from "dataloader";
// import { User } from "../entities/User";

// export const createUserLoader = () =>
//   new DataLoader<number, User>(async (userIds) => {
//     const users: User[] = await User.findByIds(userIds as number[]);
//     const userIdToUser: Record<number, User> = {};
//     users.forEach((user) => {
//       userIdToUser[user.id] = user;
//     });

//     return userIds.map((userId) => userIdToUser[userId]);
//   });

import DataLoader from "dataloader";
import { User } from "../entities/User";

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    console.log("Calling createUserLoader");

    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);
    return sortedUsers;
  });
