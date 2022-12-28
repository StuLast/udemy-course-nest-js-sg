import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  runProgram() {
    this.cpuService.compute(4, 10);
    this.diskService.getData();
  }
}
