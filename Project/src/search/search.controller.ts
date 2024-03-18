import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('search')
@UseGuards(
  JwtAuthGuard,
  SetSchemaGuard,
  new RoleGuard(['inventory_manager', 'owner']),
)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // @Get()
  // findAll() {
  //   return this.searchService.findAll();
  // }

  //find any data based on user search
  @Get()
  findOne(@Query() qry: FindProductDto) {
    return this.searchService.findAny(qry);
  }
}
