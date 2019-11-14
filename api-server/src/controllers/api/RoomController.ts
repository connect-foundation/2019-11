import {
  JsonController,
  Param,
  Body,
  Patch,
  Put,
  Get,
  Post,
  Delete
} from 'routing-controllers';
import { RoomService } from '../../services/RoomService';
import { Rooms } from '../../models/Rooms';

@JsonController('/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  public find() {
    return this.roomService.find();
  }

  @Get('/:id')
  public findOne(@Param('id') id: string) {
    return this.roomService.findOne(parseInt(id));
  }

  @Post()
  public create(@Body() room: Rooms) {
    //TODO: room을 Rooms Model에 맞게 class-transformer를 사용해서 처리하자
    return this.roomService.create(room);
  }

  @Put('/:id')
  @Patch('/:id')
  public update(@Param('id') id: string, @Body() room: Rooms) {
    //TODO: room을 Rooms Model에 맞게 class-transformer를 사용해서 처리하자
    return this.roomService.update(parseInt(id), room);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string) {
    return this.roomService.delete(parseInt(id));
  }
}
