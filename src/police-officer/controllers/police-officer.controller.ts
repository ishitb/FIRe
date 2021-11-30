import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PoliceOfficerService } from '../services/police-officer.service';
import { PoliceOfficerDto } from '../dto/police-officer.dto';
import { PoliceOfficer } from '../interfaces/police-officer.interface';

@Controller('police-officer')
export class PoliceOfficerController {
  constructor(private officerService: PoliceOfficerService) {}

  @Get()
  getFir(): Promise<PoliceOfficer[]> {
    return this.officerService.getOfficer();
  }

  @Post()
  postOfficer(@Body() Officerdto: PoliceOfficerDto): Promise<PoliceOfficer> {
    return this.officerService.postOfficer(Officerdto);
  }

  @Get(':id')
  getOfficerById(@Param('id') id): Promise<PoliceOfficer> {
    return this.officerService.getOfficerById(id);
  }

  @Delete(':id')
  deleteOfficerById(@Param('id') id): Promise<PoliceOfficer> {
    return this.officerService.deleteOfficerById(id);
  }

  @Put(':id')
  putOfficerById(
    @Body() updateFirDto: PoliceOfficerDto,
    @Param('id') id,
  ): Promise<PoliceOfficer> {
    return this.officerService.putOfficerById(id, updateFirDto);
  }
}
