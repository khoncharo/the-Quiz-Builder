import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class QuestionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.CHECKBOX })
  type: QuestionType;

  @ApiProperty({ example: 'Pick your favourite colors' })
  label: string;

  @ApiProperty({ type: [String], example: ['Red', 'Green', 'Blue'] })
  options: string[];

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  quizId: string;
}
