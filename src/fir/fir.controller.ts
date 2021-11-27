import { Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, } from '@nestjs/common';
import { FirService } from './fir.service';
import { FirDto } from './fir.dto';
import { Fir } from './interfaces/fir.interface';

@Controller('fir')
export class FirController {
    constructor(private readonly firService: FirService) {}

    @Get()
    getFir(): Promise<Fir[]> {
      return this.firService.getFir();
    }
  
    @Post()
    postFir(@Body() Firdto: FirDto): Promise<Fir> {
      return this.firService.postFir(Firdto);
    }
  
    @Get(':id')
    getFirById(@Param('id') id): Promise<Fir> {
      return this.firService.getFirById(id);
    }
  
    @Delete(':id')
    deleteFirById(@Param('id') id): Promise<Fir> {
      return this.firService.deleteFirById(id);
    }
  
    @Put(':id')
    putFirById(@Body() updateFirDto: FirDto, @Param('id') id): Promise<Fir> {
      return this.firService.putFirById(id, updateFirDto);
    }
}
