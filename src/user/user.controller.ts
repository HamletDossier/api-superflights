import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(jwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
	constructor(private readonly userService:UserService){}
	@Post()
	@ApiOperation({summary:'Create User'})
	create(@Body() userDTO:UserDTO){
		return this.userService.create(userDTO);
	}

	@Get()
	@ApiOperation({summary:'Find all Users'})
	findAll(){
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({summary:'Find a User by Id'})
	findOne(@Param('id') id:string){
		return this.userService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({summary:'Update a User by Id'})
	update(@Param('id') id:string, @Body() userDTO:UserDTO){
		return this.userService.update(id, userDTO);
	}

	@Delete(':id')
	@ApiOperation({summary:'Delete a User by Id'})
	delete(@Param('id') id:string){
		return this.userService.delete(id);

	}
}
