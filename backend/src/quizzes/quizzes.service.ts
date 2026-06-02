import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizzesRepository } from './repositories/quizzes.repository';
import { IQuizSummary, IQuizDetail } from './interfaces';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizError } from './enums/errors.enum';

@Injectable()
export class QuizzesService {
  constructor(private readonly quizzesRepository: QuizzesRepository) {}

  public async create(dto: CreateQuizDto): Promise<IQuizDetail> {
    return this.quizzesRepository.create(dto);
  }

  public async findAll(): Promise<IQuizSummary[]> {
    return this.quizzesRepository.findAll();
  }

  public async findById(id: string): Promise<IQuizDetail> {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) throw new NotFoundException(QuizError.QUIZ_NOT_FOUND);
    return quiz;
  }

  public async delete(id: string): Promise<void> {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) throw new NotFoundException(QuizError.QUIZ_NOT_FOUND);
    await this.quizzesRepository.delete(id);
  }
}
