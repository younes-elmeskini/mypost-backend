import { RouterModule, Routes } from '@nestjs/core';
import { UserController } from '../controllers/user.controller';

const routes: Routes = [
  {
    path: 'user',
    module: UserController,
    children: [
      {
        path: ':id',
        module: UserController,
      },
    ],
  },
];

export default RouterModule.register(routes);