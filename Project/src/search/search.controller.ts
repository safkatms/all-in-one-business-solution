import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindPurchaseDto } from 'src/purchase-management/dto/find-purchase.dto';

@ApiTags('Search')
@Controller('search')
// @UseGuards(
//   JwtAuthGuard,
//   SetSchemaGuard,
//   new RoleGuard(['inventory_manager', 'owner']),
// )
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // @Get()
  // findAll() {
  //   return this.searchService.findAll();
  // }

  //find any data based on user search
  @Get()
  @ApiBearerAuth('access-token')
  @ApiQuery({
    name: 'productName',
    required: false,
    description: 'Name of the product',
    example: 'Nimbus2000',
  })
  @ApiQuery({
    name: 'productDetails',
    required: false,
    description: 'Details of the product',
  })
  @ApiQuery({
    name: 'productPurchasePrice',
    required: false,
    description: 'Purchase price of the product',
  })
  @ApiQuery({
    name: 'productSellPrice',
    required: false,
    description: 'Sell price of the product',
  })
  @ApiQuery({
    name: 'productBrand',
    required: false,
    description: 'Brand of the product',
  })
  @ApiQuery({
    name: 'productQuantity',
    required: false,
    description: 'Quantity of the product',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for filtering products',
  })
  @ApiQuery({
    name: 'vendorName',
    required: false,
    description: 'Name of the vendor',
  })
  @ApiQuery({
    name: 'vendorContact',
    required: false,
    description: 'Contact number of the vendor',
  })
  @ApiQuery({
    name: 'vendorEmail',
    required: false,
    description: 'Email of the vendor',
  })
  @ApiQuery({
    name: 'purchaseDate',
    required: false,
    description: 'Date of the purchase',
  })
  @ApiOkResponse({ description: 'Search results found.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })

  //func
  findOne(@Query() qry: FindProductDto | FindPurchaseDto) {
    return this.searchService.findAny(qry);
  }
}
