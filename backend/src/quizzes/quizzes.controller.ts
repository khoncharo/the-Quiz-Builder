import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { IQuizDetail } from './interfaces/quiz-detail.interface';
import { IQuizSummary } from './interfaces/quiz-summary.interface';
import {
  ApiCreateQuiz,
  ApiFindAllQuizzes,
  ApiFindQuizById,
  ApiDeleteQuiz,
} from './swagger';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiCreateQuiz()
  public async create(@Body() dto: CreateQuizDto): Promise<IQuizDetail> {
    return this.quizzesService.create(dto);
  }

  @Get()
  @ApiFindAllQuizzes()
  public async findAll(): Promise<IQuizSummary[]> {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiFindQuizById()
  public async findById(@Param('id') id: string): Promise<IQuizDetail> {
    return this.quizzesService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteQuiz()
  public async delete(@Param('id') id: string): Promise<void> {
    return this.quizzesService.delete(id);
  }
}
