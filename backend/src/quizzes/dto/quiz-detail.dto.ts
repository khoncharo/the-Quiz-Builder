import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class QuizDetailDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'General Knowledge' })
  title: string;

  @ApiProperty({ type: [QuestionDto] })
  questions: QuestionDto[];

  @ApiProperty({ example: '2026-06-02T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-02T10:00:00.000Z' })
  updatedAt: Date;
}
