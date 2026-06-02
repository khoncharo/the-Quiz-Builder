import { ApiProperty } from '@nestjs/swagger';

export class QuizSummaryDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'General Knowledge' })
  title: string;

  @ApiProperty({ example: 3 })
  questionCount: number;
}
