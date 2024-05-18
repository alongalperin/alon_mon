import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { BranchesModule } from './branches/branches.module';

@Module({
  imports: [RepositoriesModule, BranchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
