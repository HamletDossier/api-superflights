import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto ';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(jwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {
	constructor(private readonly passengerService: PassengerService){}

	@Post()
	@ApiOperation({summary:'Create Passenger'})
	create(@Body() passengerDTO:PassengerDTO){
		return this.passengerService.create(passengerDTO);
	}

	@Get()
	@ApiOperation({summary:'Find all Passengers'})
	findAll(){
		return this.passengerService.findAll();
	}

	@Get(':id')
	@ApiOperation({summary:'Find a Passenger by Id'})
	findOne(@Param('id') id:string){
		return this.passengerService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({summary:'Update a Passenger by Id'})
	update(@Param('id') id:string, @Body() passengerDTO:PassengerDTO){
		return this.passengerService.update(id,passengerDTO);

	}
	@Delete(':id')
	@ApiOperation({summary:'Delete a Passenger by Id'})
	delete(@Param('id') id:string){
		return this.passengerService.delete(id);
	}
}
