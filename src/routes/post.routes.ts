import { RouterModule, Routes } from '@nestjs/core';
import { PostController } from '../controllers/post.controller';

const routes: Routes = [
  {
    path: 'posts',
    module: PostController,
  },
];

export default RouterModule.register(routes);