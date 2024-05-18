import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { BranchesModule } from './branches/branches.module';
import { CommitsModule } from './commits/commits.module';

@Module({
  imports: [RepositoriesModule, BranchesModule, CommitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
