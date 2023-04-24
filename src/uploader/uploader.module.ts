import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';

@Module({
  providers: [
    {
      provide: UploaderService,
      useValue: UploaderService,
    },
  ],
  exports: [UploaderService],
})
export class UploaderModule {}
