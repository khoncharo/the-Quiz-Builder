import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { IQuizSummary, IQuizDetail } from '../interfaces';

@Injectable()
export class QuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateQuizDto): Promise<IQuizDetail> {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q) => ({
            type: q.type,
            label: q.label,
            options: q.options ?? [],
          })),
        },
      },
      include: { questions: true },
    });
  }

  public async findAll(): Promise<IQuizSummary[]> {
    const quizzes = await this.prisma.quiz.findMany({
      include: { _count: { select: { questions: true } } },
    });
    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      questionCount: q._count.questions,
    }));
  }

  public async findById(id: string): Promise<IQuizDetail | null> {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.quiz.delete({ where: { id } });
  }
}
