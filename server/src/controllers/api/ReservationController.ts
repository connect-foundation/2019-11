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
import { ReservationService } from '../../services/ReservationService';
import { Reservations } from '../../models/Reservations';

@JsonController('/reservations')
export class reservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  public find() {
    return this.reservationService.find();
  }

  @Get('/:id')
  public findOne(@Param('id') id: string) {
    return this.reservationService.findOne(parseInt(id));
  }

  @Post()
  public create(@Body() reservation: Reservations) {
    //TODO: reservation을 Reservations Model에 맞게 class-transformer를 사용해서 처리하자
    return this.reservationService.create(reservation);
  }

  @Put('/:id')
  @Patch('/:id')
  public update(@Param('id') id: string, @Body() reservation: Reservations) {
    //TODO: reservation을 Reservations Model에 맞게 class-transformer를 사용해서 처리하자
    return this.reservationService.update(parseInt(id), reservation);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string) {
    return this.reservationService.delete(parseInt(id));
  }
}
